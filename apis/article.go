package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"kassar/app"
	"kassar/models"
	"strconv"
)

type (
	articleService interface {
		Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.Article, error)
		Count(rs app.RequestScope, filter string) (int, error)
		Get(rs app.RequestScope, id int) (*models.Article, error)
		GetByPath(rs app.RequestScope, id string) (*models.Article, error)
		Create(rs app.RequestScope, model *models.Article) (*models.Article, error)
		Update(rs app.RequestScope, id int, model *models.Article) (*models.Article, error)
	}

	articleResource struct {
		service articleService
	}
)

func ServArticleResource(rg *routing.RouteGroup, service articleService){
	r := &articleResource{service}
	rg.Post("/articles", r.create)
	rg.Patch("/articles/<id>", r.update)
	rg.Get("/articles/<id>", r.get)
	rg.Get("/article/<id>", r.getByPath)
	rg.Get("/articles", r.query)
}

func (r *articleResource) get(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	response, err := r.service.Get(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *articleResource) getByPath(c *routing.Context) error {
	id := c.Param("id")

	response, err := r.service.GetByPath(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *articleResource) query(c *routing.Context) error {
	rs := app.GetRequestScope(c)
	filter := c.Query("filter")

	count, err := r.service.Count(rs, filter)
	if err != nil {
		return err
	}

	sorting := c.Query("sortOrder")
	if sorting == "" {
		sorting = "asc"
	}

	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(app.GetRequestScope(c), paginatedList.Offset(), paginatedList.Limit(), sorting, filter)
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}

func (r *articleResource) create(c *routing.Context) error {
	var model models.Article
	if err := c.Read(&model); err != nil {
		return err
	}
	model.Date = app.GetRequestScope(c).Now().String()
	response, err := r.service.Create(app.GetRequestScope(c), &model)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *articleResource) update(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	rs := app.GetRequestScope(c)

	model, err := r.service.Get(rs, id)
	if err != nil {
		return err
	}

	if err := c.Read(model); err != nil {
		return err
	}

	//model.Date = rs.Now().String()

	response, err := r.service.Update(rs, id, model)
	if err != nil {
		return err
	}

	return c.Write(response)
}


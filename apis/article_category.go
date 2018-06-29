package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
	"strconv"
)

type (
	articleCategoryService interface {
		Get(rs app.RequestScope, id int) (*models.ArticleCategory, error)
		GetByPath(rs app.RequestScope, id string) (*models.ArticleCategory, error)
		/*Create(rs app.RequestScope, model *models.ArticleCategory) (*models.ArticleCategory, error)
		Update(rs app.RequestScope, id int, model *models.ArticleCategory) (*models.ArticleCategory, error)*/
		Query(rs app.RequestScope, offset, limit int) ([]models.ArticleCategory, error)
		Count(rs app.RequestScope) (int, error)
	}

	articleCategoryResource struct {
		service articleCategoryService
	}
)

func ServArticleCategoryResource(rg *routing.RouteGroup, service articleCategoryService){
	r := &articleCategoryResource{service}
	//rg.Post("/articles", r.create)
	//rg.Patch("/articles/<id>", r.update)
	rg.Get("/product-category/<id>", r.get)
	rg.Get("/product-category/<id>", r.getByPath)
	rg.Get("/product-categories", r.query)
}

func (r *articleCategoryResource) get(c *routing.Context) error {
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

func (r *articleCategoryResource) getByPath(c *routing.Context) error {
	id := c.Param("id")

	response, err := r.service.GetByPath(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *articleCategoryResource) query(c *routing.Context) error {

	/*id, err := strconv.Atoi(c.Request.FormValue("id"))
	if err != nil {
		id = 0
	}*/
	rs := app.GetRequestScope(c)
	count, err := r.service.Count(rs)
	if err != nil {
		return err
	}
	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(rs, paginatedList.Offset(), paginatedList.Limit())
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}
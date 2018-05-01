package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"kassar/app"
	"kassar/models"
)

type (
	articleService interface {
		Query(rs app.RequestScope, offset, limit int) ([]models.Article, error)
		Count(rs app.RequestScope) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Article, error)
	}

	articleResource struct {
		service articleService
	}
)

func ServArticleResource(rg *routing.RouteGroup, service articleService){
	r := &articleResource{service}
	rg.Get("/article/<id>", r.getByPath)
	rg.Get("/article", r.query)
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
	count, err := r.service.Count(rs)
	if err != nil {
		return err
	}
	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(app.GetRequestScope(c), paginatedList.Offset(), paginatedList.Limit())
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}

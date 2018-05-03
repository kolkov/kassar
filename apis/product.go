package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"kassar/app"
	"kassar/models"
)

type (
	productService interface {
		Query(rs app.RequestScope, offset, limit int) ([]models.Product, error)
		Count(rs app.RequestScope) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Product, error)
	}

	productResource struct {
		service productService
	}
)

func ServProductResource(rg *routing.RouteGroup, service productService){
	r := &productResource{service}
	rg.Get("/products/<id>", r.getByPath)
	rg.Get("/products", r.query)
}

func (r *productResource) getByPath(c *routing.Context) error {
	id := c.Param("id")

	response, err := r.service.GetByPath(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *productResource) query(c *routing.Context) error {
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

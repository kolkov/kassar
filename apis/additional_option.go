package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	additionalOptionService interface {
		Query(rs app.RequestScope, offset, limit, id int) ([]models.AdditionalOption, error)
		Count(rs app.RequestScope, id int) (int, error)
	}

	additionalOptionResource struct {
		service additionalOptionService
	}
)

func ServAdditionalOptionResource(rg *routing.RouteGroup, service additionalOptionService){
	r := &additionalOptionResource{service}
	rg.Get("/additional-options", r.query)
}

func (r *additionalOptionResource) query(c *routing.Context) error {
	rs := app.GetRequestScope(c)

	items, err := r.service.Query(rs, 0, 100, 0)
	if err != nil {
		return err
	}

	return c.Write(items)
}

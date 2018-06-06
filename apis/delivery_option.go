package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	deliveryOptionService interface {
		Query(rs app.RequestScope, offset, limit, id int) ([]models.DeliveryOption, error)
		Count(rs app.RequestScope, id int) (int, error)
	}

	deliveryOptionResource struct {
		service deliveryOptionService
	}
)

func ServDeliveryOptionResource(rg *routing.RouteGroup, service deliveryOptionService){
	r := &deliveryOptionResource{service}
	rg.Get("/delivery-options", r.query)
}

func (r *deliveryOptionResource) query(c *routing.Context) error {
	rs := app.GetRequestScope(c)

	items, err := r.service.Query(rs, 0, 100, 0)
	if err != nil {
		return err
	}

	return c.Write(items)
}

package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	paymentOptionService interface {
		Query(rs app.RequestScope, offset, limit, id int) ([]models.PaymentOption, error)
		Count(rs app.RequestScope, id int) (int, error)
	}

	paymentOptionResource struct {
		service paymentOptionService
	}
)

func ServPaymentOptionResource(rg *routing.RouteGroup, service paymentOptionService){
	r := &paymentOptionResource{service}
	rg.Get("/payment-options", r.query)
}

func (r *paymentOptionResource) query(c *routing.Context) error {
	rs := app.GetRequestScope(c)

	items, err := r.service.Query(rs, 0, 100, 0)
	if err != nil {
		return err
	}

	return c.Write(items)
}

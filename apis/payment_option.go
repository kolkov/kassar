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
	//rg.Get("/payments/<id>", r.getByPath)
	rg.Get("/payment-options", r.query)
}

func (r *paymentOptionResource) query(c *routing.Context) error {

	/*id, err := strconv.Atoi(c.Request.FormValue("id"))
	if err != nil {
		id = 0
	}*/
	rs := app.GetRequestScope(c)
	/*count, err := r.service.Count(rs, id)
	if err != nil {
		return err
	}*/
	//paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(rs, 0, 100, 0)
	if err != nil {
		return err
	}
	//paginatedList.Items = items
	return c.Write(items)
}

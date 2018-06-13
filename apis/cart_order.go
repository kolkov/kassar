package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
	"kassar/services"
)

type (
	cartOrderService interface {
		Create(rs app.RequestScope, model *models.Order) (*models.Order, error)
		GetEmail(rs app.RequestScope, id int) (*[]models.CartOrderItemEmail, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.Order, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Order, error)*/
	}

	cartOrderResource struct {
		service     cartOrderService
		itemService cartOrderItemService
		customerService cartOrderCustomerService
	}
)

func ServCartOrderResource(rg *routing.RouteGroup, service cartOrderService, itemService cartOrderItemService, customerService cartOrderCustomerService){
	r := &cartOrderResource{service, itemService, customerService}
	rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

func (r *cartOrderResource) create(c *routing.Context) error {
	var model models.CartOrderInput
	if err := c.Read(&model); err != nil {
		return err
	}
	rs := app.GetRequestScope(c)

	model.Date = rs.Now()

		cartOrder, err := r.service.Create(rs, &model.Order)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(app.GetRequestScope(c), cartOrder.Id, model.Items)
	model.Customer.OrderId = cartOrder.Id
	cartOrderCustomer, err := r.customerService.Create(rs, model.Customer)
	if err != nil {
		return err
	}
	_ = cartOrderCustomer

	emailItems, err := r.service.GetEmail(rs, cartOrder.Id)
	if err != nil {
		return err
	}
	services.SendEmail(cartOrder, cartOrderCustomer, emailItems)
	services.SendEmail2(cartOrder, cartOrderCustomer, emailItems)
	return c.Write(cartOrder)
}

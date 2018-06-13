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
		service                 cartOrderService
		itemService             cartOrderItemService
		customerService         cartOrderCustomerService
		addressService          addressService
		deliveryAddressService  deliveryAddressService
		orderCustomerMapService orderCustomerMapService
	}
)

func ServCartOrderResource(rg *routing.RouteGroup, service cartOrderService,
	itemService cartOrderItemService, customerService cartOrderCustomerService,
	addressService addressService, service2 deliveryAddressService, mapService orderCustomerMapService) {
	r := &cartOrderResource{service, itemService, customerService,
	addressService, service2, mapService}
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

	customer, err := r.customerService.Create(rs, model.Customer)
	if err != nil {
		return err
	}

	//model.Customer.OrderId = cartOrder.Id
	address, err := r.addressService.GetByFiasId(rs, model.Customer.FiasAddress.FiasId)
	if address.Id == 0 {
		address.Full = model.Customer.Address.Full
		address, err = r.addressService.Create(rs, model.Customer.FiasAddress)
		if err != nil {
			return err
		}
	}
	deliveryAddress := model.Customer.Address
	deliveryAddress.AddressId = address.Id
	r.deliveryAddressService.Create(rs, &deliveryAddress)

	orderCustomerMap := &models.OrderCustomerMap{cartOrder.Id, customer.Id}
	r.orderCustomerMapService.Create(rs, orderCustomerMap)

	_ = customer

	emailItems, err := r.service.GetEmail(rs, cartOrder.Id)
	if err != nil {
		return err
	}
	services.SendEmailCustomer(cartOrder, customer, emailItems)
	services.SendEmailForUs(cartOrder, customer, emailItems)
	return c.Write(cartOrder)
}

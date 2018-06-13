package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
	"kassar/services"
)

type (
	orderService interface {
		Create(rs app.RequestScope, model *models.Order) (*models.Order, error)
		GetEmail(rs app.RequestScope, id int) (*[]models.CartOrderItemEmail, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.Order, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Order, error)*/
	}

	orderResource struct {
		service                 orderService
		itemService             cartOrderItemService
		customerService         customerService
		addressService          addressService
		deliveryAddressService  deliveryAddressService
		orderCustomerMapService orderCustomerMapService
		countryService          countryService
	}
)

func ServOrderResource(rg *routing.RouteGroup,
	service orderService,
	itemService cartOrderItemService,
	customerService customerService,
	addressService addressService,
	service2 deliveryAddressService,
	mapService orderCustomerMapService,
	service3 countryService) {
	r := &orderResource{service,
		itemService,
		customerService,
		addressService,
		service2,
		mapService,
		service3}
	rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

func (r *orderResource) create(c *routing.Context) error {
	var model models.CartOrderInput
	if err := c.Read(&model); err != nil {
		return err
	}
	rs := app.GetRequestScope(c)

	model.Date = rs.Now()

	customer, err := r.customerService.GetByEmail(rs, model.Customer.Email)
	if customer.Id == 0 {
		customer, err = r.customerService.Create(rs, model.Customer)
		if err != nil {
			return err
		}
	}

	model.Order.CustomerId = customer.Id
	model.Fio = model.Customer.Fio
	cartOrder, err := r.service.Create(rs, &model.Order)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(rs, cartOrder.Id, model.Items)



	address, err := r.addressService.GetByFiasId(rs, model.Customer.FiasAddress.FiasId)
	if address.Id == 0 {
		country, _ := r.countryService.GetByName(rs, model.Customer.FiasAddress.Country)
		address.Full = model.Customer.Address.Full
		address.CountryId = country.Id
		address, err = r.addressService.Create(rs, model.Customer.FiasAddress)
		if err != nil {
			return err
		}
	}

	deliveryAddress, _ := r.deliveryAddressService.GetByFiasId(rs, model.Customer.FiasAddress.FiasId)
	if deliveryAddress.Id == 0 {
		deliveryAddress = &model.Customer.Address
		deliveryAddress.FiasId = model.Customer.FiasAddress.FiasId
		deliveryAddress.AddressId = address.Id
		r.deliveryAddressService.Create(rs, deliveryAddress)

	}

	orderCustomerMap := &models.OrderCustomerMap{cartOrder.Id, customer.Id}
	r.orderCustomerMapService.Create(rs, orderCustomerMap)

	emailItems, err := r.service.GetEmail(rs, cartOrder.Id)
	if err != nil {
		return err
	}
	services.SendEmailCustomer(cartOrder, customer, emailItems)
	services.SendEmailForUs(cartOrder, customer, emailItems)
	return c.Write(cartOrder)
}

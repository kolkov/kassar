package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
	"kassar/services"
	"fmt"
	"strconv"
)

type (
	orderService interface {
		Get(rs app.RequestScope, id int) (*models.Order, error)
		Create(rs app.RequestScope, model *models.Order) (*models.Order, error)
		GetEmail(rs app.RequestScope, id int) (*[]models.CartOrderItemEmail, error)
		Query(rs app.RequestScope, offset, limit, id int) ([]models.Order, error)
		Count(rs app.RequestScope, id int) (int, error)
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
	rg.Get("/orders/<id>", r.get)
	rg.Post("/orders", r.create)
	rg.Get("/orders", r.query)
}

func (r *orderResource) get(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	response, err := r.service.Get(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	//productOut := &models.Order{}
	//productOut = *response

	return c.Write(response)
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
	if (customer.LastName == "" && model.Customer.LastName != "") || (customer.Patronymic == "" && model.Customer.Patronymic != "") {
		customer, err = r.customerService.Update(rs, customer.Id, model.Customer)
		if err != nil {
			return err
		}
	}

	if model.DeliveryOptionId > 1 {
		address, err := r.addressService.GetByFiasId(rs, model.Customer.FiasAddress.FiasId)
		if address.Id == 0 {
			country, _ := r.countryService.GetByName(rs, model.Customer.FiasAddress.Country)
			address = model.Customer.FiasAddress
			address.Full = model.Customer.Address.Full
			address.CountryId = country.Id
			address, err = r.addressService.Create(rs, address)
			if err != nil {
				return err
			}
		}

		deliveryAddress, err := r.deliveryAddressService.GetByFiasId(rs, model.Customer.FiasAddress.FiasId)

		if deliveryAddress.Id == 0 {
			deliveryAddress = &model.Customer.Address
			deliveryAddress.FiasId = model.Customer.FiasAddress.FiasId
			deliveryAddress.AddressId = address.Id
			deliveryAddress, err = r.deliveryAddressService.Create(rs, deliveryAddress)
			if err != nil {
				return err
			}
		}
		model.DeliveryId = deliveryAddress.Id
		fmt.Println(model.DeliveryId)
	}

	model.Order.CustomerId = customer.Id
	model.Fio = model.Customer.Fio

	cartOrder, err := r.service.Create(rs, &model.Order)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(rs, cartOrder.Id, model.Items)

	orderCustomerMap := &models.OrderCustomerMap{cartOrder.Id, customer.Id, model.DeliveryId}
	r.orderCustomerMapService.Create(rs, orderCustomerMap)

	emailItems, err := r.service.GetEmail(rs, cartOrder.Id)
	if err != nil {
		return err
	}
	services.SendEmailCustomer(cartOrder, customer, emailItems)
	services.SendEmailForUs(cartOrder, customer, emailItems)
	return c.Write(cartOrder)
}

func (r *orderResource) query(c *routing.Context) error {

	id, err := strconv.Atoi(c.Request.FormValue("id"))
	if err != nil {
		id = 0
	}
	rs := app.GetRequestScope(c)
	count, err := r.service.Count(rs, id)
	if err != nil {
		return err
	}
	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(rs, paginatedList.Offset(), paginatedList.Limit(), id)
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}
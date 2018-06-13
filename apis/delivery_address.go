package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	deliveryAddressService interface {
		Create(rs app.RequestScope, model *models.DeliveryAddress) (*models.DeliveryAddress, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.DeliveryAddress, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.DeliveryAddress, error)*/
	}

	deliveryAddressResource struct {
		service     deliveryAddressService
	}
)

func ServDeliveryAddressResource(rg *routing.RouteGroup, service deliveryAddressService){
	//r := &deliveryAddressResource{service}
	//rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

/*func (r *deliveryAddressResource) create(c *routing.Context) error {
	var model models.DeliveryAddress
	if err := c.Read(&model); err != nil {
		return err
	}
	response, err := r.service.Create(app.GetRequestScope(c), &model.DeliveryAddress)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(app.GetRequestScope(c), response.Id, model.Items)
	//services.SendEmail(response)
	//services.SendEmail2(response)
	return c.Write(response)
}*/

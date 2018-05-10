package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	cartOrderService interface {
		Create(rs app.RequestScope, model *models.CartOrder) (*models.CartOrder, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.CartOrder, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.CartOrder, error)*/
	}

	cartOrderResource struct {
		service     cartOrderService
		itemService cartOrderItemService
	}
)

func ServCartOrderResource(rg *routing.RouteGroup, service cartOrderService, itemService cartOrderItemService){
	r := &cartOrderResource{service, itemService}
	rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

func (r *cartOrderResource) create(c *routing.Context) error {
	var model models.CartOrderInput
	if err := c.Read(&model); err != nil {
		return err
	}
	response, err := r.service.Create(app.GetRequestScope(c), &model.CartOrder)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(app.GetRequestScope(c), response.Id, model.Items)
	//services.SendEmail(response)
	//services.SendEmail2(response)
	return c.Write(response)
}

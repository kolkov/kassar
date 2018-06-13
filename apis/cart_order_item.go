package apis

import (
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
	"kassar/app"
)

type (
	cartOrderItemService interface {
		CreateItems(rs app.RequestScope, id int, items []*models.OrderItem)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]*models.OrderItem, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.OrderItem, error)*/
	}

	cartOrderItemResource struct {
		service cartOrderItemService
		propertiesService cartOrderItemService
	}
)

func ServCartOrderItemResource(rg *routing.RouteGroup, service cartOrderItemService, propertiesService cartOrderItemService){
	//r := &cartOrderItemResource{service, propertiesService}
	/*rg.Get("/orders/item/<id>", r.getByPath)
	rg.Get("/orders/item", r.query)*/
}

package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	cartOrderCustomerService interface {
		Create(rs app.RequestScope, model *models.Customer) (*models.Customer, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.Customer, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Customer, error)*/
	}

	cartOrderCustomerResource struct {
		service     cartOrderCustomerService
	}
)

func ServCartOrderCustomerResource(rg *routing.RouteGroup, service cartOrderCustomerService){
	//r := &cartOrderCustomerResource{service}
	//rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

/*func (r *cartOrderCustomerResource) create(c *routing.Context) error {
	var model models.Customer
	if err := c.Read(&model); err != nil {
		return err
	}
	response, err := r.service.Create(app.GetRequestScope(c), &model.Customer)
	if err != nil {
		return err
	}
	r.itemService.CreateItems(app.GetRequestScope(c), response.Id, model.Items)
	//services.SendEmail(response)
	//services.SendEmail2(response)
	return c.Write(response)
}*/

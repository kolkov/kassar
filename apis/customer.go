package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
)

type (
	customerService interface {
		Get(rs app.RequestScope, id int) (*models.Customer, error)
		GetByEmail(rs app.RequestScope, email string) (*models.Customer, error)
		Create(rs app.RequestScope, model *models.Customer) (*models.Customer, error)
		Update(rs app.RequestScope, id int, model *models.Customer) (*models.Customer, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.Customer, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Customer, error)*/
	}

	customerResource struct {
		service customerService
	}
)

func ServCustomerResource(rg *routing.RouteGroup, service customerService){
	//r := &customerResource{service}
	//rg.Post("/orders", r.create)
	/*rg.Get("/orders/<id>", r.getByPath)
	rg.Get("/orders", r.query)*/
}

/*func (r *customerResource) create(c *routing.Context) error {
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

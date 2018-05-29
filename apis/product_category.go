package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
	"strconv"
)

type (
	productCategoryService interface {
		Get(rs app.RequestScope, id int) (*models.ProductCategory, error)
		GetByPath(rs app.RequestScope, id string) (*models.ProductCategory, error)
		Create(rs app.RequestScope, model *models.ProductCategory) (*models.ProductCategory, error)
		Update(rs app.RequestScope, id int, model *models.ProductCategory) (*models.ProductCategory, error)
		Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.ProductCategory, error)
		Count(rs app.RequestScope, filter string) (int, error)
	}

	productCategoryResource struct {
		service productCategoryService
	}
)

func ServProductCategoryResource(rg *routing.RouteGroup, service productCategoryService){
	r := &productCategoryResource{service}
	//rg.Post("/articles", r.create)
	//rg.Patch("/articles/<id>", r.update)
	rg.Get("/articles/<id>", r.get)
	rg.Get("/article/<id>", r.getByPath)
	//rg.Get("/articles", r.query)
}

func (r *productCategoryResource) get(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	response, err := r.service.Get(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *productCategoryResource) getByPath(c *routing.Context) error {
	id := c.Param("id")

	response, err := r.service.GetByPath(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

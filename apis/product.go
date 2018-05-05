package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"kassar/app"
	"kassar/models"
	"strconv"
)

type (
	productService interface {
		Query(rs app.RequestScope, offset, limit, id int) ([]models.Product, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Product, error)
	}

	productResource struct {
		service productService
		propertiesService productPropertiesService
	}
)

func ServProductResource(rg *routing.RouteGroup, service productService, propertiesService productPropertiesService){
	r := &productResource{service, propertiesService}
	rg.Get("/products/<id>", r.getByPath)
	rg.Get("/products", r.query)
}

func (r *productResource) getByPath(c *routing.Context) error {
	id := c.Param("id")

	response, err := r.service.GetByPath(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	//idInt, err := strconv.Atoi(id)
	prop, err := r.propertiesService.Query(app.GetRequestScope(c), 0, 100, response.Id)
	response.Properties = prop

	return c.Write(response)
}

func (r *productResource) query(c *routing.Context) error {

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

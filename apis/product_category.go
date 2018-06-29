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
		/*Create(rs app.RequestScope, model *models.ProductCategory) (*models.ProductCategory, error)
		Update(rs app.RequestScope, id int, model *models.ProductCategory) (*models.ProductCategory, error)*/
		Query(rs app.RequestScope, offset, limit int) ([]models.ProductCategory, error)
		Count(rs app.RequestScope) (int, error)
	}

	productCategoryResource struct {
		service productCategoryService
	}
)

func ServProductCategoryResource(rg *routing.RouteGroup, service productCategoryService){
	r := &productCategoryResource{service}
	//rg.Post("/articles", r.create)
	//rg.Patch("/articles/<id>", r.update)
	rg.Get("/product-category/<id>", r.get)
	rg.Get("/product-category/<id>", r.getByPath)
	rg.Get("/product-categories", r.query)
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

func (r *productCategoryResource) query(c *routing.Context) error {

	/*id, err := strconv.Atoi(c.Request.FormValue("id"))
	if err != nil {
		id = 0
	}*/
	rs := app.GetRequestScope(c)
	count, err := r.service.Count(rs)
	if err != nil {
		return err
	}
	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(rs, paginatedList.Offset(), paginatedList.Limit())
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}
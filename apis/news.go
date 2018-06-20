/**
 * Created by Andrey Kolkov on 05.12.2018.
 */
package apis

import (
	"kassar/models"
	"kassar/app"
	"github.com/go-ozzo/ozzo-routing"
	"strconv"
)

type (
	newsService interface {
		Get(rs app.RequestScope, id int) (*models.News, error)
		Query(rs app.RequestScope, offset, limit int) ([]models.News, error)
		Count(rs app.RequestScope) (int, error)
	}

	// newsResource defines the handlers for the CRUD APIs.
	newsResource struct {
		service newsService
	}
)

// ServeNews sets up the routing of news endpoints and the corresponding handlers.
func ServeNewsResource(rg *routing.RouteGroup, service newsService){
	r := &newsResource{service}
	rg.Get("/news/<id>", r.get)
	rg.Get("/news", r.query)
}

func (r *newsResource) get(c *routing.Context) error {
	rs :=app.GetRequestScope(c)
	userId, err := strconv.Atoi(rs.UserID())
	if err != nil {
		return err
	}

	items, err := r.service.Get(rs, userId)
	if err != nil {
		return err
	}

	return c.Write(items)
}


func (r *newsResource) query(c *routing.Context) error {
	rs := app.GetRequestScope(c)
	count, err := r.service.Count(rs)
	if err != nil {
		return err
	}
	paginatedList := getPaginatedListFromRequest(c, count)
	items, err := r.service.Query(app.GetRequestScope(c), paginatedList.Offset(), paginatedList.Limit())
	if err != nil {
		return err
	}
	paginatedList.Items = items
	return c.Write(paginatedList)
}

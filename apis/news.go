/**
 * Created by Andrey Kolkov on 05.12.2016.
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
		//Create(rs app.RequestScope, model *models.User) (*models.User, error)
		//Update(rs app.RequestScope, id int, model *models.User) (*models.User, error)
		//Delete(rs app.RequestScope, id int) (*models.User, error)
		//UpdatePassword(rs app.RequestScope, id int, oldPassword, newPassword string) (error)
		//GetNews(rs app.RequestScope, id int) ([]models.News, error)
		//QueryFeed(rs app.RequestScope, offset, limit int) ([]models.Feed, error)
		//CreateFeed(rs app.RequestScope, model *models.Feed) (*models.Feed, error)
	}

	// userResource defines the handlers for the CRUD APIs.
	newsResource struct {
		service newsService
	}
)

// ServeUser sets up the routing of person endpoints and the corresponding handlers.
func ServeNewsResource(rg *routing.RouteGroup, service newsService){
	r := &newsResource{service}
	rg.Get("/news/<id>", r.get)
	rg.Get("/news", r.query)
	//rg.Post("/users", r.create)
	//rg.Put("/users/<id>", r.update)
	//rg.Delete("/users/<id>", r.delete)
	//rg.Put("/user/password", r.updatePassword)
	//rg.Get("/user/news", r.getNews)
	/*rg.Get("/user/feed", r.queryFeed)
	rg.Post("/user/feed", r.createFeed)*/
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

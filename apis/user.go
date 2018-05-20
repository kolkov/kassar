/**
 * Created by Andrey Kolkov on 21.11.2016.
 */
package apis

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-routing"
	"strconv"
)

type (
	userService interface {
		Get(rs app.RequestScope, id int) (*models.User, error)
		Query(rs app.RequestScope, offset, limit int) ([]models.User, error)
		Count(rs app.RequestScope) (int, error)
		Create(rs app.RequestScope, model *models.User) (*models.User, error)
		Update(rs app.RequestScope, id int, model *models.User) (*models.User, error)
		Delete(rs app.RequestScope, id int) (*models.User, error)
		UpdatePassword(rs app.RequestScope, id int, oldPassword, newPassword string) (error)
		/*GetNews(rs app.RequestScope, id int) ([]models.News, error)
		QueryFeed(rs app.RequestScope, offset, limit int) ([]models.Feed, error)
		CreateFeed(rs app.RequestScope, model *models.Feed) (*models.Feed, error)*/
	}

	// userResource defines the handlers for the CRUD APIs.
	userResource struct {
		service userService
	}

	userPassword struct {
		Old string `json:"oldPassword"`
		New string `json:"newPassword"`
	}
)

// ServeUser sets up the routing of person endpoints and the corresponding handlers.
func ServeUserResource(rg *routing.RouteGroup, service userService){
	r := &userResource{service}
	rg.Get("/users/<id>", r.get)
	rg.Get("/users", r.query)
	rg.Post("/users", r.create)
	rg.Put("/users/<id>", r.update)
	rg.Delete("/users/<id>", r.delete)
	rg.Put("/user/password", r.updatePassword)
	//rg.Get("/user/news", r.getNews)
	/*rg.Get("/user/feed", r.queryFeed)
	rg.Post("/user/feed", r.createFeed)*/
}

func (r *userResource) get(c *routing.Context) error {
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

func (r *userResource) query(c *routing.Context) error {
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

func (r *userResource) create(c *routing.Context) error {
	var model models.User
	if err := c.Read(&model); err != nil {
		return err
	}
	response, err := r.service.Create(app.GetRequestScope(c), &model)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *userResource) update(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	rs := app.GetRequestScope(c)

	model, err := r.service.Get(rs, id)
	if err != nil {
		return err
	}

	if err := c.Read(model); err != nil {
		return err
	}

	response, err := r.service.Update(rs, id, model)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *userResource) delete(c *routing.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}

	response, err := r.service.Delete(app.GetRequestScope(c), id)
	if err != nil {
		return err
	}

	return c.Write(response)
}

func (r *userResource) updatePassword(c *routing.Context) error {
	rs :=app.GetRequestScope(c)
	userId, err := strconv.Atoi(rs.UserID())
	if err != nil {
		return err
	}
	var password userPassword
	c.Read(&password)
	err = r.service.UpdatePassword(rs, userId, password.Old, password.New)
	if err != nil {
		return err
	}

	return c.Write(map[string]string{
		"status": "201",
		"message": "Password was changed successfully",
	})
}

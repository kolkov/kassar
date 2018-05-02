/**
 * Created by Andrey Kolkov on 05.12.2016.
 */
package services

import (
	"kassar/models"
	"kassar/app"
)

type newsDAO interface {
	// Change password the user with the given ID from the storage.
	Get(rs app.RequestScope, id int) (*models.News, error)
	// Count returns the number of users.
	Count(rs app.RequestScope) (int, error)
	// Query returns the list of the users with the given offset and limit.
	Query(rs app.RequestScope, offset, limit int) ([]models.News, error)
}

// UserService provides services related with users.
type NewsService struct {
	dao newsDAO
}

// NewUserService creates a new UserService with the given user DAO.
func NewNewsService(dao newsDAO) *NewsService {
	return &NewsService{dao}
}

func (s *NewsService) Get(rs app.RequestScope, id int) (*models.News, error) {
	return s.dao.Get(rs, id)
}

// Count returns the number of users.
func (s *NewsService) Count(rs app.RequestScope) (int, error) {
	return s.dao.Count(rs)
}

// Query returns the users with the specified offset and limit.
func (s *NewsService) Query(rs app.RequestScope, offset, limit int) ([]models.News, error) {
	return s.dao.Query(rs, offset, limit)
}
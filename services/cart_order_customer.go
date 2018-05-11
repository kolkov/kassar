package services

import (
	"kassar/models"
	"kassar/app"
)

type cartOrderCustomerDAO interface {
	Get(rs app.RequestScope, id int) (*models.CartOrderCustomer, error)
	Create(rs app.RequestScope, customer *models.CartOrderCustomer) error
	/*GetByPath(scope app.RequestScope, id string) (*models.CartOrderCustomer,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, id int) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit, id int) ([]models.CartOrderCustomer, error)*/
}

type CartOrderCustomerService struct {
	dao cartOrderCustomerDAO
}

func NewCartOrderCustomerService(dao cartOrderCustomerDAO) *CartOrderCustomerService{
	return &CartOrderCustomerService{dao}
}

func (s *CartOrderCustomerService) Get(rs app.RequestScope, id int) (*models.CartOrderCustomer, error) {
	return s.dao.Get(rs, id)
}

func (s *CartOrderCustomerService) Create(rs app.RequestScope, model *models.CartOrderCustomer) (*models.CartOrderCustomer, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

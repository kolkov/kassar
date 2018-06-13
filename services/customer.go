package services

import (
	"kassar/models"
	"kassar/app"
)

type customerDAO interface {
	Get(rs app.RequestScope, id int) (*models.Customer, error)
	GetByEmail(rs app.RequestScope, email string) (*models.Customer, error)
	Create(rs app.RequestScope, customer *models.Customer) error
	Update(rs app.RequestScope, id int, user *models.Customer) error
}

type CustomerService struct {
	dao customerDAO
}

func NewCustomerService(dao customerDAO) *CustomerService {
	return &CustomerService{dao}
}

func (s *CustomerService) Get(rs app.RequestScope, id int) (*models.Customer, error) {
	return s.dao.Get(rs, id)
}

func (s *CustomerService) GetByEmail(rs app.RequestScope, email string) (*models.Customer, error) {
	return s.dao.GetByEmail(rs, email)
}

func (s *CustomerService) Create(rs app.RequestScope, model *models.Customer) (*models.Customer, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

func (s *CustomerService) Update(rs app.RequestScope, id int, model *models.Customer) (*models.Customer, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Update(rs, id, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, id)
}

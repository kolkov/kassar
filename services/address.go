package services

import (
	"kassar/models"
	"kassar/app"
)

type AddressDAO interface {
	Get(rs app.RequestScope, id int) (*models.Address, error)
	GetByFiasId(rs app.RequestScope, id string) (*models.Address, error)
	Create(rs app.RequestScope, address *models.Address) error
}

type AddressService struct {
	dao AddressDAO
}

func NewAddressService(dao AddressDAO) *AddressService{
	return &AddressService{dao}
}

func (s *AddressService) Get(rs app.RequestScope, id int) (*models.Address, error) {
	return s.dao.Get(rs, id)
}

func (s *AddressService) GetByFiasId(rs app.RequestScope, id string) (*models.Address, error) {
	return s.dao.GetByFiasId(rs, id)
}

func (s *AddressService) Create(rs app.RequestScope, model *models.Address) (*models.Address, error) {
	/*if err := model.Validate(); err != nil {
		return nil, err
	}*/
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

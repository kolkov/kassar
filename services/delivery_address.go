package services

import (
	"kassar/models"
	"kassar/app"
)

type deliveryAddressDAO interface {
	Get(rs app.RequestScope, id int) (*models.DeliveryAddress, error)
	Create(rs app.RequestScope, deliveryAddress *models.DeliveryAddress) error
}

type DeliveryAddressService struct {
	dao deliveryAddressDAO
}

func NewDeliveryAddressService(dao deliveryAddressDAO) *DeliveryAddressService{
	return &DeliveryAddressService{dao}
}

func (s *DeliveryAddressService) Get(rs app.RequestScope, id int) (*models.DeliveryAddress, error) {
	return s.dao.Get(rs, id)
}

func (s *DeliveryAddressService) Create(rs app.RequestScope, model *models.DeliveryAddress) (*models.DeliveryAddress, error) {
	/*if err := model.Validate(); err != nil {
		return nil, err
	}*/
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

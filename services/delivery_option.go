package services

import (
	"kassar/app"
	"kassar/models"
)

type deliveryOptionDAO interface {
	Count(rs app.RequestScope, id int) (int, error)
	Query(rs app.RequestScope, offset, limit, id int) ([]models.DeliveryOption, error)
}

type DeliveryOptionService struct {
	dao deliveryOptionDAO
}

func NewDeliveryOptionService(dao deliveryOptionDAO) *DeliveryOptionService{
	return &DeliveryOptionService{dao}
}

func (s *DeliveryOptionService) Count(rs app.RequestScope, id int) (int, error) {
	return s.dao.Count(rs, id)
}


func (s *DeliveryOptionService) Query(rs app.RequestScope, offset, limit, id int) ([]models.DeliveryOption, error) {
	return s.dao.Query(rs, offset, limit, id)
}

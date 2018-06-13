package services

import (
	"kassar/models"
	"kassar/app"
)

type orderCustomerMapDAO interface {
	Get(rs app.RequestScope, orderId, customerId int) (*models.OrderCustomerMap, error)
	Create(rs app.RequestScope, model *models.OrderCustomerMap,) error
}

type OrderCustomerMapService struct {
	dao orderCustomerMapDAO
}

func NewOrderCustomerMapService(dao orderCustomerMapDAO) *OrderCustomerMapService{
	return &OrderCustomerMapService{dao}
}

func (s *OrderCustomerMapService) Get(rs app.RequestScope, orderId, customerId int) (*models.OrderCustomerMap, error) {
	return s.dao.Get(rs, orderId, customerId)
}

func (s *OrderCustomerMapService) Create(rs app.RequestScope, model *models.OrderCustomerMap) (*models.OrderCustomerMap, error) {
	/*if err := model.Validate(); err != nil {
		return nil, err
	}*/
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.OrderId, model.CustomerId)
}

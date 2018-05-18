package services

import (
	"kassar/app"
	"kassar/models"
)

type paymentOptionDAO interface {
	Count(rs app.RequestScope, id int) (int, error)
	Query(rs app.RequestScope, offset, limit, id int) ([]models.PaymentOption, error)
}

type PaymentOptionService struct {
	dao paymentOptionDAO
}

func NewPaymentOptionService(dao paymentOptionDAO) *PaymentOptionService{
	return &PaymentOptionService{dao}
}

func (s *PaymentOptionService) Count(rs app.RequestScope, id int) (int, error) {
	return s.dao.Count(rs, id)
}


func (s *PaymentOptionService) Query(rs app.RequestScope, offset, limit, id int) ([]models.PaymentOption, error) {
	return s.dao.Query(rs, offset, limit, id)
}

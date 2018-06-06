package services

import (
	"kassar/app"
	"kassar/models"
)

type additionalOptionDAO interface {
	Count(rs app.RequestScope, id int) (int, error)
	Query(rs app.RequestScope, offset, limit, id int) ([]models.AdditionalOption, error)
}

type AdditionalOptionService struct {
	dao additionalOptionDAO
}

func NewAdditionalOptionService(dao additionalOptionDAO) *AdditionalOptionService{
	return &AdditionalOptionService{dao}
}

func (s *AdditionalOptionService) Count(rs app.RequestScope, id int) (int, error) {
	return s.dao.Count(rs, id)
}


func (s *AdditionalOptionService) Query(rs app.RequestScope, offset, limit, id int) ([]models.AdditionalOption, error) {
	return s.dao.Query(rs, offset, limit, id)
}

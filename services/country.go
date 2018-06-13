package services

import (
	"kassar/app"
	"kassar/models"
)

type countryDAO interface {
	Get(rs app.RequestScope, id int) (*models.Country, error)
	GetByName(rs app.RequestScope, name string) (*models.Country, error)
}

type CountryService struct {
	dao countryDAO
}

func NewCountryService(dao countryDAO) *CountryService {
	return &CountryService{dao}
}

func (s *CountryService) Get(rs app.RequestScope, id int) (*models.Country, error) {
	return s.dao.Get(rs, id)
}

func (s *CountryService) GetByName(rs app.RequestScope, name string) (*models.Country, error) {
	return s.dao.GetByName(rs, name)
}
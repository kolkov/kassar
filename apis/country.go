package apis

import (
	"kassar/app"
	"kassar/models"
)

type (
	countryService interface {
		Get(rs app.RequestScope, id int) (*models.Country, error)
		GetByName(rs app.RequestScope, name string) (*models.Country, error)
	}

	countryResource struct {
		service countryService
	}
)

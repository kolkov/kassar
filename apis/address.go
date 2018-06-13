package apis

import (
	"kassar/app"
	"kassar/models"
)

type (
	addressService interface {
		Get(rs app.RequestScope, id int) (*models.Address, error)
		GetByFiasId(rs app.RequestScope, id string) (*models.Address, error)
		Create(rs app.RequestScope, model *models.Address) (*models.Address, error)
		/*Query(rs app.RequestScope, offset, limit, id int) ([]models.Customer, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.Customer, error)*/
	}

	addressResource struct {
		service     addressService
	}
)

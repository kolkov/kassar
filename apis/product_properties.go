package apis

import (
	"kassar/models"
	"kassar/app"
)

type (
	productPropertiesService interface {
		Query(rs app.RequestScope, offset, limit, id int) ([]models.ProductProperties, error)
		Count(rs app.RequestScope, id int) (int, error)
		GetByPath(rs app.RequestScope, id string) (*models.ProductProperties, error)
	}

	productPropertiesResource struct {
		service productPropertiesService
	}
)

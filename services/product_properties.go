package services

import (
	"kassar/models"
	"kassar/app"
)

type productPropertiesDAO interface {
	GetByPath(scope app.RequestScope, id string) (*models.ProductProperties, error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, id int) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit, id int) ([]models.ProductProperties, error)
}

type ProductPropertiesService struct {
	dao productPropertiesDAO
}

func NewProductPropertiesService(dao productPropertiesDAO) *ProductPropertiesService {
	return &ProductPropertiesService{dao}
}

func (s *ProductPropertiesService) GetByPath(rs app.RequestScope, id string) (*models.ProductProperties, error) {
	return s.dao.GetByPath(rs, id)
}

// Count returns the number of artists.
func (s *ProductPropertiesService) Count(rs app.RequestScope, id int) (int, error) {
	return s.dao.Count(rs, id)
}

// Query returns the artists with the specified offset and limit.
func (s *ProductPropertiesService) Query(rs app.RequestScope, offset, limit, id int) ([]models.ProductProperties, error) {
	return s.dao.Query(rs, offset, limit, id)
}

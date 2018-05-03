package services

import (
	"kassar/app"
	"kassar/models"
)

type productDAO interface {
	GetByPath(scope app.RequestScope, id string) (*models.Product,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit int) ([]models.Product, error)
}

type ProductService struct {
	dao productDAO
}

func NewProductService(dao productDAO) *ProductService{
	return &ProductService{dao}
}

func (s *ProductService) GetByPath(rs app.RequestScope, id string) (*models.Product, error) {
	return s.dao.GetByPath(rs, id)
}

// Count returns the number of artists.
func (s *ProductService) Count(rs app.RequestScope) (int, error) {
	return s.dao.Count(rs)
}


// Query returns the artists with the specified offset and limit.
func (s *ProductService) Query(rs app.RequestScope, offset, limit int) ([]models.Product, error) {
	return s.dao.Query(rs, offset, limit)
}
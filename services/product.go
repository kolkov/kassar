package services

import (
	"kassar/app"
	"kassar/models"
)

type productDAO interface {
	Get(rs app.RequestScope, id int) (*models.Product, error)

	GetByPath(scope app.RequestScope, id string) (*models.Product,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, id int) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit, id int) ([]models.Product, error)

	Create(rs app.RequestScope, product *models.Product) error

	Update(rs app.RequestScope, id int, product *models.Product) error
}

type ProductService struct {
	dao productDAO
}

func NewProductService(dao productDAO) *ProductService{
	return &ProductService{dao}
}

func (s *ProductService) Get(rs app.RequestScope, id int) (*models.Product, error) {
	return s.dao.Get(rs, id)
}

func (s *ProductService) GetByPath(rs app.RequestScope, id string) (*models.Product, error) {
	return s.dao.GetByPath(rs, id)
}

func (s *ProductService) Count(rs app.RequestScope, id int) (int, error) {
	return s.dao.Count(rs, id)
}


func (s *ProductService) Query(rs app.RequestScope, offset, limit, id int) ([]models.Product, error) {
	return s.dao.Query(rs, offset, limit, id)
}

func (s *ProductService) Create(rs app.RequestScope, model *models.Product) (*models.Product, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

func (s *ProductService) Update(rs app.RequestScope, id int, model *models.Product) (*models.Product, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Update(rs, id, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, id)
}
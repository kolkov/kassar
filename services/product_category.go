package services

import (
	"kassar/app"
	"kassar/models"
)

type productCategoryDAO interface {
	Get(rs app.RequestScope, id int) (*models.ProductCategory, error)

	GetByPath(scope app.RequestScope, id string) (*models.ProductCategory, error)
	// Count returns the number of artists.
	/*Count(rs app.RequestScope, filter string) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.ProductCategory, error)

	Create(rs app.RequestScope, productCategory *models.ProductCategory) error
*/
	Update(rs app.RequestScope, id int, productCategory *models.ProductCategory) error
}

type ProductCategoryService struct {
	dao productCategoryDAO
}

func NewProductCategoryService(dao productCategoryDAO) *ProductCategoryService{
	return &ProductCategoryService{dao}
}

func (s *ProductCategoryService) Get(rs app.RequestScope, id int) (*models.ProductCategory, error) {
	return s.dao.Get(rs, id)
}

func (s *ProductCategoryService) GetByPath(rs app.RequestScope, id string) (*models.ProductCategory, error) {
	return s.dao.GetByPath(rs, id)
}

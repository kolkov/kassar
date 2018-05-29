package services

import (
	"kassar/app"
	"kassar/models"
)

type articleCategoryDAO interface {
	Get(rs app.RequestScope, id int) (*models.ArticleCategory, error)

	GetByPath(scope app.RequestScope, id string) (*models.ArticleCategory, error)
	// Count returns the number of artists.
	Count(rs app.RequestScope) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit int) ([]models.ArticleCategory, error)

	/*Create(rs app.RequestScope, articleCategory *models.ArticleCategory) error

	Update(rs app.RequestScope, id int, articleCategory *models.ArticleCategory) error*/
}

type ArticleCategoryService struct {
	dao articleCategoryDAO
}

func NewArticleCategoryService(dao articleCategoryDAO) *ArticleCategoryService{
	return &ArticleCategoryService{dao}
}

func (s *ArticleCategoryService) Get(rs app.RequestScope, id int) (*models.ArticleCategory, error) {
	return s.dao.Get(rs, id)
}

func (s *ArticleCategoryService) GetByPath(rs app.RequestScope, id string) (*models.ArticleCategory, error) {
	return s.dao.GetByPath(rs, id)
}

// Count returns the number of users.
func (s *ArticleCategoryService) Count(rs app.RequestScope) (int, error) {
	return s.dao.Count(rs)
}

// Query returns the users with the specified offset and limit.
func (s *ArticleCategoryService) Query(rs app.RequestScope, offset, limit int) ([]models.ArticleCategory, error) {
	return s.dao.Query(rs, offset, limit)
}
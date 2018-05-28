package services

import (
	"kassar/app"
	"kassar/models"
)

type articleDAO interface {
	Get(rs app.RequestScope, id int) (*models.Article, error)

	GetByPath(scope app.RequestScope, id string) (*models.Article,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, filter string) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.Article, error)

	Create(rs app.RequestScope, article *models.Article) error

	Update(rs app.RequestScope, id int, article *models.Article) error
}

type ArticleService struct {
	dao articleDAO
}

func NewArticleService(dao articleDAO) *ArticleService{
	return &ArticleService{dao}
}

func (s *ArticleService) Get(rs app.RequestScope, id int) (*models.Article, error) {
	return s.dao.Get(rs, id)
}

func (s *ArticleService) GetByPath(rs app.RequestScope, id string) (*models.Article, error) {
	return s.dao.GetByPath(rs, id)
}

// Count returns the number of artists.
func (s *ArticleService) Count(rs app.RequestScope, filter string) (int, error) {
	return s.dao.Count(rs, filter)
}

// Query returns the artists with the specified offset and limit.
func (s *ArticleService) Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.Article, error) {
	return s.dao.Query(rs, offset, limit, sorting, filter)
}

func (s *ArticleService) Create(rs app.RequestScope, model *models.Article) (*models.Article, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

func (s *ArticleService) Update(rs app.RequestScope, id int, model *models.Article) (*models.Article, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Update(rs, id, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, id)
}
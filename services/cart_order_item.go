package services

import (
	"kassar/app"
	"kassar/models"
)

type cartOrderItemDAO interface {
	Get(rs app.RequestScope, id int) (*models.OrderItem, error)
	Create(rs app.RequestScope, items *models.OrderItem) error
	/*GetByPath(scope app.RequestScope, id string) (*models.OrderItem,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, id int) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit, id int) ([]models.OrderItem, error)*/
}

type CartOrderItemService struct {
	dao cartOrderItemDAO
}

func NewCartOrderItemService(dao cartOrderItemDAO) *CartOrderItemService{
	return &CartOrderItemService{dao}
}

func (s *CartOrderItemService) Get(rs app.RequestScope, id int) (*models.OrderItem, error) {
	return s.dao.Get(rs, id)
}

func (s *CartOrderItemService) Create(rs app.RequestScope, model *models.OrderItem) (*models.OrderItem, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

func (s *CartOrderItemService) CreateItems(rs app.RequestScope, id int, items []*models.OrderItem) {
	for _, item := range items{
		item.OrderId = id;
		s.Create(rs, item)
	}
}

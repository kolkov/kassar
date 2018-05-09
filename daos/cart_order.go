package daos

import (
	"kassar/app"
	"kassar/models"
)

type CartOrderDAO struct{}

func NewCartOrderDAO() *CartOrderDAO {
	return &CartOrderDAO{}
}

func (dao *CartOrderDAO) Get(rs app.RequestScope, id int) (*models.CartOrder, error) {
	var person models.CartOrder
	err := rs.Tx().Select().Model(id, &person)
	return &person, err
}

func (dao *CartOrderDAO) Create(rs app.RequestScope, order *models.CartOrder) error {
	order.Id = 0
	return rs.Tx().Model(order).Insert()
}
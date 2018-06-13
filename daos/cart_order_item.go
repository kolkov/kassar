package daos

import (
	"kassar/app"
	"kassar/models"
)

type CartOrderItemDAO struct{}

func NewCartOrderItemDAO() *CartOrderItemDAO {
	return &CartOrderItemDAO{}
}

func (dao *CartOrderItemDAO) Get(rs app.RequestScope, id int) (*models.OrderItem, error) {
	var person models.OrderItem
	err := rs.Tx().Select().Model(id, &person)
	return &person, err
}


func (dao *CartOrderItemDAO) Create(rs app.RequestScope, order *models.OrderItem) error {
	order.Id = 0
	return rs.Tx().Model(order).Insert()
}
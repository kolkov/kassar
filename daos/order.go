package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type OrderDAO struct{}

func NewOrderDAO() *OrderDAO {
	return &OrderDAO{}
}

func (dao *OrderDAO) Get(rs app.RequestScope, id int) (*models.Order, error) {
	var cartOrder models.Order
	err := rs.Tx().Select().Model(id, &cartOrder)
	return &cartOrder, err
}

func (dao *OrderDAO) Create(rs app.RequestScope, order *models.Order) error {
	order.Id = 0
	return rs.Tx().Model(order).Insert()
}

func (dao *OrderDAO) GetEmail(rs app.RequestScope, orderId int) (*[]models.CartOrderItemEmail, error) {
	var order []models.CartOrderItemEmail
	err := rs.Tx().Select().From("order").LeftJoin("order_item", dbx.NewExp("`order`.`id` = `order_item`.`order_id`")).
	LeftJoin("product", dbx.NewExp("`order_item`.`product_id` = `product`.`id`")).Where(dbx.HashExp{"order_id": orderId}).All(&order)
	return &order, err
}
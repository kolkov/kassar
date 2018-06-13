package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type CartOrderDAO struct{}

func NewCartOrderDAO() *CartOrderDAO {
	return &CartOrderDAO{}
}

func (dao *CartOrderDAO) Get(rs app.RequestScope, id int) (*models.Order, error) {
	var cartOrder models.Order
	err := rs.Tx().Select().Model(id, &cartOrder)
	return &cartOrder, err
}

func (dao *CartOrderDAO) Create(rs app.RequestScope, order *models.Order) error {
	order.Id = 0
	return rs.Tx().Model(order).Insert()
}

func (dao *CartOrderDAO) GetEmail(rs app.RequestScope, orderId int) (*[]models.CartOrderItemEmail, error) {
	var order []models.CartOrderItemEmail
	err := rs.Tx().Select().From("cart_order").LeftJoin("cart_order_item", dbx.NewExp("`cart_order`.`id` = `cart_order_item`.`order_id`")).
	LeftJoin("product", dbx.NewExp("`cart_order_item`.`product_id` = `product`.`id`")).Where(dbx.HashExp{"order_id": orderId}).All(&order)
	return &order, err
}
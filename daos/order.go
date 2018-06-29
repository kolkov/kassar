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

func (dao *OrderDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	q := rs.Tx().Select("COUNT(*)").From("product")
	if id != 0 {
		q.Where(dbx.HashExp{"category_id": id})
	}
	err := q.Row(&count)
	return count, err
}

func (dao *OrderDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.Order, error) {
	artists := []models.Order{}
	q := rs.Tx().Select()
	if id != 0 {
		q.Where(dbx.HashExp{"category_id": id})
	}
	err := q.OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).OrderBy("id").All(&artists)
	return artists, err
}
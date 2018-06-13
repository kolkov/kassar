package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type OrderCustomerMapDAO struct{}

func NewOrderCustomerMapDAO() *OrderCustomerMapDAO {
	return &OrderCustomerMapDAO{}
}

func (dao *OrderCustomerMapDAO) Get(rs app.RequestScope, orderId, customerId, deliveryId int) (*models.OrderCustomerMap, error) {
	var model models.OrderCustomerMap
	err := rs.Tx().Select().Where(dbx.HashExp{"order_id": orderId, "customer_id": customerId, "delivery_id": deliveryId}).One(&model)
	return &model, err
}

func (dao *OrderCustomerMapDAO) Create(rs app.RequestScope, model *models.OrderCustomerMap) error {
	//model.Id = 0
	return rs.Tx().Model(model).Insert()
}
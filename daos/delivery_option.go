package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type DeliveryOptionDAO struct{}

func NewDeliveryOptionDAO() *DeliveryOptionDAO {
	return &DeliveryOptionDAO{}
}

func (dao *DeliveryOptionDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("delivery_option").Where(dbx.HashExp{"enabled": true}).Row(&count)
	return count, err
}

func (dao *DeliveryOptionDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.DeliveryOption, error) {
	deliveryOption := []models.DeliveryOption{}
	err := rs.Tx().Select().OrderBy("id").Where(dbx.HashExp{"enabled": true}).Offset(int64(offset)).Limit(int64(limit)).All(&deliveryOption)
	return deliveryOption, err
}
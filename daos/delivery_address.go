package daos

import (
	"kassar/app"
	"kassar/models"
)

type DeliveryAddressDAO struct{}

func NewDeliveryAddressDAO() *DeliveryAddressDAO {
	return &DeliveryAddressDAO{}
}

func (dao *DeliveryAddressDAO) Get(rs app.RequestScope, id int) (*models.DeliveryAddress, error) {
	var deliveryAddress models.DeliveryAddress
	err := rs.Tx().Select().Model(id, &deliveryAddress)
	return &deliveryAddress, err
}

func (dao *DeliveryAddressDAO) Create(rs app.RequestScope, deliveryAddress *models.DeliveryAddress) error {
	deliveryAddress.Id = 0
	return rs.Tx().Model(deliveryAddress).Insert()
}
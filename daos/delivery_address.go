package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
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

func (dao *DeliveryAddressDAO) GetByFiasId(rs app.RequestScope, id string) (*models.DeliveryAddress, error) {
	var deliveryAddress models.DeliveryAddress
	err := rs.Tx().Select().Where(dbx.HashExp{"fias_id": id}).One(&deliveryAddress)
	return &deliveryAddress, err
}

func (dao *DeliveryAddressDAO) Create(rs app.RequestScope, deliveryAddress *models.DeliveryAddress) error {
	deliveryAddress.Id = 0
	return rs.Tx().Model(deliveryAddress).Insert()
}
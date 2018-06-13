package daos

import (
	"kassar/app"
	"kassar/models"
)

type AddressDAO struct{}

func NewAddressDAO() *AddressDAO {
	return &AddressDAO{}
}

func (dao *AddressDAO) Get(rs app.RequestScope, id int) (*models.Address, error) {
	var model models.Address
	err := rs.Tx().Select().Model(id, &model)
	return &model, err
}

func (dao *AddressDAO) GetByFiasId(rs app.RequestScope, id string) (*models.Address, error) {
	var model models.Address
	err := rs.Tx().Select().Model(id, &model)
	return &model, err
}

func (dao *AddressDAO) Create(rs app.RequestScope, model *models.Address) error {
	model.Id = 0
	return rs.Tx().Model(model).Insert()
}
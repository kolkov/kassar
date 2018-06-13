package daos

import (
	"kassar/app"
	"kassar/models"
)

type CustomerDAO struct{}

func NewCustomerDAO() *CustomerDAO {
	return &CustomerDAO{}
}

func (dao *CustomerDAO) Get(rs app.RequestScope, id int) (*models.Customer, error) {
	var customer models.Customer
	err := rs.Tx().Select().Model(id, &customer)
	return &customer, err
}

func (dao *CustomerDAO) Create(rs app.RequestScope, customer *models.Customer) error {
	customer.Id = 0
	return rs.Tx().Model(customer).Insert()
}
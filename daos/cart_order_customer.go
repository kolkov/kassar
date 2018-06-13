package daos

import (
	"kassar/app"
	"kassar/models"
)

type CartOrderCustomerDAO struct{}

func NewCartOrderCustomerDAO() *CartOrderCustomerDAO {
	return &CartOrderCustomerDAO{}
}

func (dao *CartOrderCustomerDAO) Get(rs app.RequestScope, id int) (*models.Customer, error) {
	var customer models.Customer
	err := rs.Tx().Select().Model(id, &customer)
	return &customer, err
}

func (dao *CartOrderCustomerDAO) Create(rs app.RequestScope, customer *models.Customer) error {
	customer.Id = 0
	return rs.Tx().Model(customer).Insert()
}
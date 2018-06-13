package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
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

func (dao *CustomerDAO) GetByEmail(rs app.RequestScope, email string) (*models.Customer, error) {
	var customer models.Customer
	err := rs.Tx().Select().Where(dbx.HashExp{"email": email}).One(&customer)
	return &customer, err
}

func (dao *CustomerDAO) Create(rs app.RequestScope, customer *models.Customer) error {
	customer.Id = 0
	return rs.Tx().Model(customer).Insert()
}

func (dao *CustomerDAO) Update(rs app.RequestScope, id int, user *models.Customer) error {
	if _, err := dao.Get(rs, id); err != nil {
		return err
	}
	user.Id = id
	return rs.Tx().Model(user).Exclude("Id").Update()
}
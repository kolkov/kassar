package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type CountryDAO struct{}

func NewCountryDAO() *CountryDAO {
	return &CountryDAO{}
}

func (dao *CountryDAO) Get(rs app.RequestScope, id int) (*models.Country, error) {
	var country models.Country
	err := rs.Tx().Select().Model(id, &country)
	return &country, err
}

func (dao *CountryDAO) GetByName(rs app.RequestScope, name string) (*models.Country, error) {
	var country models.Country
	err := rs.Tx().Select().Where(dbx.HashExp{"name": name}).One(&country)
	return &country, err
}

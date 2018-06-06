package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type AdditionalOptionDAO struct{}

func NewAdditionalOptionDAO() *AdditionalOptionDAO {
	return &AdditionalOptionDAO{}
}

func (dao *AdditionalOptionDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("additional_option").Where(dbx.HashExp{"enabled": true}).Row(&count)
	return count, err
}

func (dao *AdditionalOptionDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.AdditionalOption, error) {
	additionalOption := []models.AdditionalOption{}
	err := rs.Tx().Select().OrderBy("id").Where(dbx.HashExp{"enabled": true}).Offset(int64(offset)).Limit(int64(limit)).All(&additionalOption)
	return additionalOption, err
}
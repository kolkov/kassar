package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type PaymentOptionDAO struct{}

func NewPaymentOptionDAO() *PaymentOptionDAO {
	return &PaymentOptionDAO{}
}

func (dao *PaymentOptionDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("payment_option").Where(dbx.HashExp{"enabled": true}).Row(&count)
	return count, err
}

func (dao *PaymentOptionDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.PaymentOption, error) {
	paymentOption := []models.PaymentOption{}
	err := rs.Tx().Select().OrderBy("id").Where(dbx.HashExp{"enabled": true}).Offset(int64(offset)).Limit(int64(limit)).All(&paymentOption)
	return paymentOption, err
}
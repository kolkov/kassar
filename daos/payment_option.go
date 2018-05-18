package daos

import (
	"kassar/app"
	"kassar/models"
)

type PaymentOptionDAO struct{}

func NewPaymentOptionDAO() *PaymentOptionDAO {
	return &PaymentOptionDAO{}
}

func (dao *PaymentOptionDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("payment_option").Row(&count)
	return count, err
}

func (dao *PaymentOptionDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.PaymentOption, error) {
	paymentOption := []models.PaymentOption{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).All(&paymentOption)
	return paymentOption, err
}
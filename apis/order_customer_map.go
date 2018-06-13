package apis

import (
	"kassar/models"
	"kassar/app"
	)

type (
	orderCustomerMapService interface {
		Get(rs app.RequestScope, orderId, customerId, deliveryID int) (*models.OrderCustomerMap, error)
		Create(rs app.RequestScope, model *models.OrderCustomerMap) (*models.OrderCustomerMap, error)
	}

	orderCustomerMapResource struct {
		service     orderCustomerMapService
	}
)


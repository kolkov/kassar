package models

type DeliveryAddress struct {
	Id int `json:"id"`
	AddressId int `json:"addressId"`
	Full string `json:"full"`
	Metro string `json:"metro"`
}

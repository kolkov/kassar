package models

type DeliveryAddress struct {
	Id int `json:"id"`
	AddressId int `json:"addressId"`
	Full string `json:"full"`
	City string `json:"city"`
	Street string `json:"street"`
	Building string `json:"house"`
	Block string `json:"block"`
	Room string `json:"room"`
	Code string `json:"code"`
	Floor string `json:"floor"`
	Entrance string `json:"entrance"`
	Metro string `json:"metro"`
	FiasId string `json:"fiasId"`
}

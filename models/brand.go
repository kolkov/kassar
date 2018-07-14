package models

type Brand struct {
	Id int `json:"id"`
	ManufacturerId int `json:"manufacturerId"`
	Name string `json:"name"`
	NickName string `json:"nickName"`
	Url string `json:"url"`
}

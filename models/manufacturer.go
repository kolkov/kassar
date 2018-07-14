package models

type Manufacturer struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Nickname string `json:"nickname"`
	Address string `json:"address"`
	Url string `json:"url"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

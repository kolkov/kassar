package models

type Product struct {
	Id int `json:"id"`
	Category int `json:"-"`
	Name string `json:"name"`
	Price float64 `json:"price"`
	Description string `json:"description"`
	Img string `json:"img"`
	Url string `json:"url"`
}
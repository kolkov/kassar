package models

type ProductCategory struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Nickname string `json:"nickname"`
	Path string `json:"path"`
}

package models

type ArticleCategory struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Nickname string `json:"nickname"`
	Description string `json:"description"`
	Image string `json:"image"`
	Path string `json:"path"`
}
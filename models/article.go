package models

type Article struct {
	Id int `json:"id"`
	Path string `json:"path"`
	Date string `json:"date"`
	Title string `json:"title"`
	Description string `json:"description"`
	Keywords string `json:"keywords"`
	Introduction string `json:"introduction"`
	Body string `json:"body"`
}

package models

import "time"

type Product struct {
	Id              int                 `json:"id"`
	CategoryId      int                 `json:"-"`
	Name            string              `json:"name"`
	ProductType     string              `json:"product_type"`
	Price           float64             `json:"price"`
	Description     string              `json:"description"`
	Img             string              `json:"img"`
	Url             string              `json:"url"`
	MetaDescription string              `json:"metaDescription"`
	MetaKeywords    string              `json:"metaKeywords"`
	Properties      []ProductProperties `json:"properties"`
	UpdatedAt       time.Time           `json:"updatedAt"`
}

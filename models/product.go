package models

import (
	"time"
	"github.com/go-ozzo/ozzo-validation"
)

type Product struct {
	Id              int                 `json:"id"`
	CategoryId      int                 `json:"categoryId"`
	Name            string              `json:"name"`
	ProductType     string              `json:"product_type"`
	Price           float64             `json:"price"`
	Description     string              `json:"description"`
	Img             string              `json:"img"`
	Path            string              `json:"path"`
	Url             string              `json:"url"`
	MetaDescription string              `json:"metaDescription"`
	MetaKeywords    string              `json:"metaKeywords"`
	UpdatedAt       time.Time           `json:"updatedAt"`
}

func (m Product) Validate() error {
	return validation.ValidateStruct(&m,
		//validation.Field(&m.Title, validation.Required, validation.Length(1, 150)),
		//validation.Field(&m.Body, validation.Required, validation.Length(1, 1550)),
	)
}

type ProductOut struct {
	Product
	Properties      []ProductProperties `json:"properties"`
}
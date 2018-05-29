package models

import (
	"github.com/go-ozzo/ozzo-validation"
)

type Article struct {
	Id              int    `json:"id"`
	CategoryId      int    `json:"categoryId"`
	Path            string `json:"path"`
	Date            string `json:"date"`
	Title           string `json:"title"`
	MetaDescription string `json:"metaDescription"`
	MetaKeywords    string `json:"metaKeywords"`
	Introduction    string `json:"introduction"`
	Body            string `json:"body"`
}

func (m Article) Validate() error {
	return validation.ValidateStruct(&m,
		//validation.Field(&m.Title, validation.Required, validation.Length(1, 150)),
		//validation.Field(&m.Body, validation.Required, validation.Length(1, 1550)),
	)
}

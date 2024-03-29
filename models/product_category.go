package models

import "time"

type ProductCategory struct {
	Id              int       `json:"id"`
	Name            string    `json:"name"`
	Nickname        string    `json:"nickname"`
	Description     string    `json:"description"`
	Introduction    string    `json:"introduction"`
	MetaDescription string    `json:"metaDescription"`
	MetaKeywords    string    `json:"metaKeywords"`
	Image           string    `json:"image"`
	Path            string    `json:"path"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

package models

import "time"

type ArticleCategory struct {
	Id              int       `json:"id"`
	Name            string    `json:"name"`
	Nickname        string    `json:"nickname"`
	Description     string    `json:"description"`
	MetaDescription string    `json:"metaDescription"`
	MetaKeywords    string    `json:"metaKeywords"`
	Image           string    `json:"image"`
	Path            string    `json:"path"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

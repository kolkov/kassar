package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type ArticleCategoryDAO struct{}

func NewArticleCategoryDAO() *ArticleCategoryDAO {
	return &ArticleCategoryDAO{}
}

func (dao *ArticleCategoryDAO) Get(rs app.RequestScope, id int) (*models.ArticleCategory, error) {
	var articleCategory models.ArticleCategory
	err := rs.Tx().Select().Model(id, &articleCategory)
	return &articleCategory, err
}

func (dao *ArticleCategoryDAO) GetByPath(rs app.RequestScope, id string) (*models.ArticleCategory, error) {
	var articleCategory models.ArticleCategory
	err := rs.Tx().Select().From("article_category").Where(dbx.HashExp{"path": id}).One(&articleCategory)
	return &articleCategory, err
}

// Count returns the number of the user records in the database.
func (dao *ArticleCategoryDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("news").Row(&count)
	return count, err
}

// Query retrieves the user records with the specified offset and limit from the database.
func (dao *ArticleCategoryDAO) Query(rs app.RequestScope, offset, limit int) ([]models.ArticleCategory, error) {
	productCategories := []models.ArticleCategory{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).All(&productCategories)
	return productCategories, err
}

package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type ArticleDAO struct {}

func NewArticleDAO() *ArticleDAO {
	return &ArticleDAO{}
}

func (dao *ArticleDAO) Get(rs app.RequestScope, id int) (*models.Article, error) {
	var user models.Article
	err := rs.Tx().Select().Model(id, &user)
	return &user, err
}

func (dao ArticleDAO) GetByPath(rs app.RequestScope, id string) (*models.Article, error){
	var article models.Article
	err := rs.Tx().Select().From("article").Where(dbx.HashExp{"path": id}).One(&article)
	return &article, err
}

// Count returns the number of the artist records in the database.
func (dao *ArticleDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("article").Row(&count)
	return count, err
}

// Query retrieves the artist records with the specified offset and limit from the database.
func (dao *ArticleDAO) Query(rs app.RequestScope, offset, limit int) ([]models.Article, error) {
	artists := []models.Article{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).OrderBy("id DESC").All(&artists)
	return artists, err
}


func (dao *ArticleDAO) Create(rs app.RequestScope, article *models.Article) error {
	article.Id = 0
	return rs.Tx().Model(article).Insert()
}


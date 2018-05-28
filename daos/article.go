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
func (dao *ArticleDAO) Count(rs app.RequestScope, filter string) (int, error) {
	var count int
	q := rs.Tx().Select("COUNT(*)").From("article")
	if filter != "" {
		q.Where(dbx.Like("title", filter))
	}
	err := q.Row(&count)
	return count, err
}

// Query retrieves the artist records with the specified offset and limit from the database.
func (dao *ArticleDAO) Query(rs app.RequestScope, offset, limit int, sorting, filter string) ([]models.Article, error) {
	articles := []models.Article{}
	q := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit))
	if sorting == "asc" {
		q.OrderBy("id ASC")
	} else {
		q.OrderBy("id DESC")
	}
	if filter != "" {
		q.Where(dbx.Like("title", filter))
	}
	err := q.All(&articles)
	return articles, err
}


func (dao *ArticleDAO) Create(rs app.RequestScope, article *models.Article) error {
	article.Id = 0
	return rs.Tx().Model(article).Insert()
}

func (dao *ArticleDAO) Update(rs app.RequestScope, id int, article *models.Article) error {
	if _, err := dao.Get(rs, id); err != nil {
		return err
	}
	article.Id = id
	return rs.Tx().Model(article).Exclude("Id").Update()
}


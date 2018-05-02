/**
 * Created by Andrey Kolkov on 05.12.2016.
 */
package daos

import (
	"kassar/models"
	"kassar/app"
)

type NewsDAO struct {}

func NewNewsDAO() *NewsDAO {
	return &NewsDAO{}
}

func (dao *NewsDAO) Get(rs app.RequestScope, id int) (*models.News, error) {
	newsItem := models.News{}
	err := rs.Tx().Select().OrderBy("id").Limit(10).All(&newsItem)
	return &newsItem, err
}

// Count returns the number of the user records in the database.
func (dao *NewsDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("news").Row(&count)
	return count, err
}

// Query retrieves the user records with the specified offset and limit from the database.
func (dao *NewsDAO) Query(rs app.RequestScope, offset, limit int) ([]models.News, error) {
	newsFeed := []models.News{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).All(&newsFeed)
	return newsFeed, err
}
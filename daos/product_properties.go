package daos

import (
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
	"kassar/app"
)

type ProductPropertiesDAO struct{}

func NewProductPropertiesDAO() *ProductPropertiesDAO {
	return &ProductPropertiesDAO{}
}

func (dao ProductPropertiesDAO) GetByPath(rs app.RequestScope, id string) (*models.ProductProperties, error) {
	var ProductProperties models.ProductProperties
	err := rs.Tx().Select().From("ProductProperties").Where(dbx.HashExp{"path": id}).One(&ProductProperties)
	return &ProductProperties, err
}

// Count returns the number of the artist records in the database.
func (dao *ProductPropertiesDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	q := rs.Tx().Select("COUNT(*)").From("ProductProperties")
	if id != 0 {
		q.Where(dbx.HashExp{"category": id})
	}
	err := q.Row(&count)
	return count, err
}

// Query retrieves the artist records with the specified offset and limit from the database.
func (dao *ProductPropertiesDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.ProductProperties, error) {
	artists := []models.ProductProperties{}
	q := rs.Tx().Select()
	if id != 0 {
		q.Where(dbx.HashExp{"product_id": id})
	}
	err := q.OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).OrderBy("id").All(&artists)
	return artists, err
}


package daos

import (
"kassar/app"
"kassar/models"
"github.com/go-ozzo/ozzo-dbx"
)

type ProductDAO struct {}

func NewProductDAO() *ProductDAO {
	return &ProductDAO{}
}

func (dao ProductDAO) GetByPath(rs app.RequestScope, id string) (*models.Product, error){
	var product models.Product
	err := rs.Tx().Select().From("product").Where(dbx.Like("path", id)).One(&product)
	return &product, err
}

// Count returns the number of the artist records in the database.
func (dao *ProductDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("product").Row(&count)
	return count, err
}

// Query retrieves the artist records with the specified offset and limit from the database.
func (dao *ProductDAO) Query(rs app.RequestScope, offset, limit int) ([]models.Product, error) {
	artists := []models.Product{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).OrderBy("id").All(&artists)
	return artists, err
}



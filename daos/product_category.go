package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type ProductCategoryDAO struct{}

func NewProductCategoryDAO() *ProductCategoryDAO {
	return &ProductCategoryDAO{}
}

func (dao *ProductCategoryDAO) Get(rs app.RequestScope, id int) (*models.ProductCategory, error) {
	var productCategory models.ProductCategory
	err := rs.Tx().Select().Model(id, &productCategory)
	return &productCategory, err
}

func (dao *ProductCategoryDAO) GetByPath(rs app.RequestScope, id string) (*models.ProductCategory, error) {
	var productCategory models.ProductCategory
	err := rs.Tx().Select().From("product_category").Where(dbx.HashExp{"path": id}).One(&productCategory)
	return &productCategory, err
}

// Count returns the number of the user records in the database.
func (dao *ProductCategoryDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("news").Row(&count)
	return count, err
}

// Query retrieves the user records with the specified offset and limit from the database.
func (dao *ProductCategoryDAO) Query(rs app.RequestScope, offset, limit int) ([]models.ProductCategory, error) {
	productCategories := []models.ProductCategory{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).All(&productCategories)
	return productCategories, err
}

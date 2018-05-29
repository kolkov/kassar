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

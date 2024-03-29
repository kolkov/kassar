package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type ProductDAO struct{}

func NewProductDAO() *ProductDAO {
	return &ProductDAO{}
}

func (dao *ProductDAO) Get(rs app.RequestScope, id int) (*models.Product, error) {
	var user models.Product
	err := rs.Tx().Select().Model(id, &user)
	return &user, err
}

func (dao ProductDAO) GetByPath(rs app.RequestScope, id string) (*models.Product, error) {
	var product models.Product
	err := rs.Tx().Select().From("product").Where(dbx.HashExp{"path": id}).One(&product)
	return &product, err
}

// Count returns the number of the artist records in the database.
func (dao *ProductDAO) Count(rs app.RequestScope, id int) (int, error) {
	var count int
	q := rs.Tx().Select("COUNT(*)").From("product")
	if id != 0 {
		q.Where(dbx.HashExp{"category_id": id})
	}
	err := q.Row(&count)
	return count, err
}

// Query retrieves the artist records with the specified offset and limit from the database.
func (dao *ProductDAO) Query(rs app.RequestScope, offset, limit, id int) ([]models.Product, error) {
	artists := []models.Product{}
	q := rs.Tx().Select()
	if id != 0 {
		q.Where(dbx.HashExp{"category_id": id})
	}
	err := q.OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).OrderBy("id").All(&artists)
	return artists, err
}

func (dao *ProductDAO) Create(rs app.RequestScope, product *models.Product) error {
	product.Id = 0
	return rs.Tx().Model(product).Insert()
}

func (dao *ProductDAO) Update(rs app.RequestScope, id int, product *models.Product) error {
	if _, err := dao.Get(rs, id); err != nil {
		return err
	}
	product.Id = id
	return rs.Tx().Model(product).Exclude("Id").Update()
}

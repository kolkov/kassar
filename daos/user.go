/**
 * Created by Andrey Kolkov on 21.11.2016.
 */
package daos

import (
	"kassar/app"
	"kassar/models"
	"github.com/go-ozzo/ozzo-dbx"
)

type UserDAO struct {}

func NewUserDAO() *UserDAO {
	return &UserDAO{}
}

func (dao *UserDAO) Get(rs app.RequestScope, id int) (*models.User, error) {
	var user models.User
	err := rs.Tx().Select().Model(id, &user)
	return &user, err
}

// Create saves a new user record in the database.
// The User.Id field will be populated with an automatically generated ID upon successful saving.
func (dao *UserDAO) Create(rs app.RequestScope, user *models.User) error {
	user.Id = 0
	return rs.Tx().Model(user).Insert()
}

// Update saves the changes to an user in the database.
func (dao *UserDAO) Update(rs app.RequestScope, id int, user *models.User) error {
	if _, err := dao.Get(rs, id); err != nil {
		return err
	}
	user.Id = id
	return rs.Tx().Model(user).Exclude("Id").Update()
}

// Delete deletes an user with the specified ID from the database.
func (dao *UserDAO) Delete(rs app.RequestScope, id int) error {
	user, err := dao.Get(rs, id)
	if err != nil {
		return err
	}
	return rs.Tx().Model(user).Delete()
}

// Count returns the number of the user records in the database.
func (dao *UserDAO) Count(rs app.RequestScope) (int, error) {
	var count int
	err := rs.Tx().Select("COUNT(*)").From("user").Row(&count)
	return count, err
}

func (dao *UserDAO) GetByUsernamePassword(rs app.RequestScope, username, password string) (models.Identity, error) {
	var user models.User
	passHash := models.PasswordHash(password)
	q := rs.Tx().Select().Where(dbx.HashExp{"email": username, "password_hash": passHash, "status": 1})
	err := q.One(&user)
	return user, err
}

func (dao *UserDAO) GetByEmailConfirmToken(rs app.RequestScope, token string) (models.Identity, error) {
	var user models.User
	q := rs.Tx().Select().Where(dbx.HashExp{"email_confirm_token": token, "status": 0})
	err := q.One(&user)
	return user, err
}

func (dao *UserDAO) GetByLogin(rs app.RequestScope, login string) (models.User, error) {
	var user models.User
	q := rs.Tx().Select().Where(dbx.HashExp{"login": login})
	err := q.One(&user)
	return user, err
}

func (dao *UserDAO) GetByEmail(rs app.RequestScope, email string) (models.User, error) {
	var user models.User
	q := rs.Tx().Select().Where(dbx.HashExp{"email": email})
	err := q.One(&user)
	return user, err
}

func (dao *UserDAO) GetById(rs app.RequestScope, id int) (models.Identity, error) {
	var user models.User
	q := rs.Tx().Select().Where(dbx.HashExp{"id": id, "status": 1})
	err := q.One(&user)
	return user, err
}

// Query retrieves the user records with the specified offset and limit from the database.
func (dao *UserDAO) Query(rs app.RequestScope, offset, limit int) ([]models.User, error) {
	users := []models.User{}
	err := rs.Tx().Select().OrderBy("id").Offset(int64(offset)).Limit(int64(limit)).All(&users)
	return users, err
}

func (dao *UserDAO) ChangePassword(rs app.RequestScope, id int, oldPassword, newPassword string) error {
	passHashNew := models.PasswordHash(newPassword)
	passHashOld := models.PasswordHash(oldPassword)
	_, err := rs.Tx().Update("user", dbx.Params{"password_hash": passHashNew}, dbx.HashExp{"password_hash": passHashOld, "id": id}).Execute()
	return err
}

func (dao *UserDAO) SetPassword(rs app.RequestScope, id int, password string) error {
	passHash := models.PasswordHash(password)
	_, err := rs.Tx().Update("user", dbx.Params{"password_hash": passHash}, dbx.HashExp{"id": id}).Execute()
	return err
}

func (dao *UserDAO) Enable(rs app.RequestScope, id int) error {
	_, err := rs.Tx().Update("user", dbx.Params{"status": 1}, dbx.HashExp{"id": id}).Execute()
	return err
}

func (dao *UserDAO) SetEmailConfirmToken(rs app.RequestScope, id int, token string) error {
	_, err := rs.Tx().Update("user", dbx.Params{"email_confirm_token": token}, dbx.HashExp{"id": id}).Execute()
	return err
}
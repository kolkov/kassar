package models

import (
	"bytes"
	"crypto/md5"
	"database/sql"
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Id                int
	UserName          string
	Login             string
	PasswordHash      string `json:"-"`
	Email             string
	EmailConfirmToken sql.NullString
	Mobile            string
	Status            int
	LastLogin         string `json:"last_login"`
	CreatedAt         time.Time
	UpdatedAt         time.Time
}

func (m User) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.UserName, validation.Required, validation.Length(1, 50)),
		validation.Field(&m.Email, validation.Required, validation.Length(1, 50), is.Email),
	)
}

func (u User) GetID() string {
	return strconv.Itoa(u.Id)
}

func (u User) GetName() string {
	return u.UserName
}

func (u User) GetLastLogin() string {
	if u.LastLogin == "0001-01-01T00:00:00Z" {
		return "true"
	}
	return "false"
}

func (u *User) BeforeInsert() {
	u.CreatedAt = time.Now()
	u.UpdatedAt = u.CreatedAt
}

func (u *User) BeforeUpdate() {
	u.UpdatedAt = time.Now()
}

func PasswordHash(password string) string {
	md5Password := md5.New()
	io.WriteString(md5Password, password)
	buffer := bytes.NewBuffer(nil)
	fmt.Fprintf(buffer, "%x", md5Password.Sum(nil))
	newPassHash := buffer.String()
	return newPassHash
}

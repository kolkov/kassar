/**
 * Created by Andrey Kolkov on 19.11.2016.
 */
package apis

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-ozzo/ozzo-routing"
	"github.com/go-ozzo/ozzo-routing/auth"

	"kassar/app"
	"kassar/daos"
	"kassar/errors"
	"kassar/models"
	"strconv"
)

type Credential struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Auth(signingKey string) routing.Handler {
	return func(c *routing.Context) error {
		var credential Credential
		if err := c.Read(&credential); err != nil {
			return errors.Unauthorized(err.Error())
		}

		identity := authenticate(credential, c)
		if identity == nil {
			return errors.Unauthorized("invalid credential")
		}

		token, err := auth.NewJWT(jwt.MapClaims{
			"id":          identity.GetID(),
			"username":    identity.GetName(),
			"exp":         time.Now().Add(time.Hour * 72).Unix(),
			"first_login": identity.GetLastLogin(),
		}, signingKey)
		if err != nil {
			return errors.Unauthorized(err.Error())
		}

		return c.Write(map[string]string{
			"token": token,
		})
	}
}

func authenticate(c Credential, rc *routing.Context) models.Identity {
	userDAO := daos.NewUserDAO()
	identity, err := userDAO.GetByUsernamePassword(app.GetRequestScope(rc), c.Username, c.Password)
	if err == nil {
		id, _ := strconv.Atoi(identity.GetID())
		user := identity.(models.User)
		user.LastLogin = app.GetRequestScope(rc).Now().String()
		userDAO.Update(app.GetRequestScope(rc), id, &user)
		return identity
	}
	return nil
}

func JWTHandler(c *routing.Context, j *jwt.Token) error {
	userID := j.Claims.(jwt.MapClaims)["id"].(string)
	app.GetRequestScope(c).SetUserID(userID)
	return nil
}

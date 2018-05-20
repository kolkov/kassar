/**
 * Created by Andrey Kolkov on 19.11.2016.
 */
package apis

import (
	"kassar/testdata"
	"net/http"
	"testing"
)

func TestAuth(t *testing.T) {
	testdata.ResetDB()
	router := newRouter()
	router.Post("/auth", Auth("secret"))
	runAPITests(t, router, []apiTestCase{
		{"t1 - successful login",
			"POST",
			"/auth",
			`{"username":"a.kolkov@gmail.com", "password":"12345"}`,
			http.StatusOK,
			""},
		{"t2 - unsuccessful login",
			"POST",
			"/auth",
			`{"username":"demo", "password":"bad"}`,
			http.StatusUnauthorized,
			""},
	})
}

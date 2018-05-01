package main

import (
	"fmt"
	//"kassar/apis"
	"kassar/app"
	"kassar/errors"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"github.com/Sirupsen/logrus"
	"github.com/go-ozzo/ozzo-dbx"
	"github.com/go-ozzo/ozzo-routing"
	"github.com/go-ozzo/ozzo-routing/content"
	"github.com/go-ozzo/ozzo-routing/cors"
	"github.com/go-ozzo/ozzo-routing/file"
	"github.com/go-ozzo/ozzo-routing/slash"
	"kassar/daos"
	"kassar/services"
	"kassar/apis"
)

func main() {
	// load application configurations
	if err := app.LoadConfig("./config"); err != nil {
		panic(fmt.Errorf("Invalid application configuration: %s", err))
	}

	// load error messages
	if err := errors.LoadMessages(app.Config.ErrorFile); err != nil {
		panic(fmt.Errorf("Failed to read the error message file: %s", err))
	}

	// create the logger
	logger := logrus.New()

	// connect to the database
	db, err := dbx.MustOpen("mysql", app.Config.DSN)
	if err != nil {
		panic(err)
	}
	db.LogFunc = logger.Infof

	// wire up API routing
	http.Handle("/", buildRouter(logger, db))

	// start the server
	address := fmt.Sprintf(":%v", app.Config.ServerPort)
	logger.Infof("Kassar server version %v is started at %v", app.Version, address)
	panic(http.ListenAndServe(address, nil))
}

func buildRouter(logger *logrus.Logger, db *dbx.DB) *routing.Router {
	router := routing.New()

	router.To("GET,HEAD", "/ping", func(c *routing.Context) error {
		c.Abort() // skip all other middlewares/handlers
		return c.Write("OK " + app.Version)
	})

	router.Use(
		app.Init(logger),
		slash.Remover(http.StatusMovedPermanently),
	)

	rg := router.Group("/v1")

	rg.Use(
		content.TypeNegotiator(content.JSON),
		cors.Handler(cors.Options{
			AllowOrigins: "*",
			AllowHeaders: "*",
			AllowMethods: "*",
		}),
		app.Transactional(db),
	)

	// Initialize all used DAOs
	articleDAO := daos.NewArticleDAO()

	// Initialize all used Services
	articleService := services.NewArticleService(articleDAO)

	//rg.Post("/auth", apis.Auth(app.Config.JWTSigningKey))
	//rg.Post("/user/signup", apis.Signup())
	//rg.Put("/user/email/confirm/<token>", apis.ConfirmEmail())
	/*rg.GetByPath("/slogin", apis.HandleFacebookCallback(app.Config.JWTSigningKey))
	rg.Use(auth.JWT(app.Config.JWTVerificationKey, auth.JWTOptions{
		SigningMethod: app.Config.JWTSigningMethod,
		TokenHandler:  apis.JWTHandler,
	}))*/

	// Initialize all used APIs
	apis.ServArticleResource(rg, articleService)

	logger.Info("Start Serving static files on " + app.Config.StaticPath)

	indexFile := app.Config.StaticPath + app.Config.HttpIndex

	router.Get(app.Config.HttpHref, file.Content(indexFile))

	var serverOptions file.ServerOptions

	serverOptions.CatchAllFile = indexFile
	router.Get("/*", file.Server(file.PathMap{
		app.Config.HttpHref:      app.Config.StaticPath,
		app.Config.HttpDataImage: app.Config.ImagePath,
	},
		serverOptions,
	))

	return router
}

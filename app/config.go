package app

import (
	"fmt"
	"kassar/util"

	"github.com/go-ozzo/ozzo-validation"
	"github.com/spf13/viper"
)

// Config stores the application-wide configurations
var Config appConfig

type appConfig struct {
	// the path to the error message file. Defaults to "config/errors.yaml"
	ErrorFile string `mapstructure:"error_file"`
	// the server port. Defaults to 8080
	ServerPort int `mapstructure:"server_port"`
	// the data source name (DSN) for connecting to the database. required.
	DSN string `mapstructure:"dsn"`
	// the signing method for JWT. Defaults to "HS256"
	JWTSigningMethod string `mapstructure:"jwt_signing_method"`
	// JWT signing key. required.
	JWTSigningKey string `mapstructure:"jwt_signing_key"`
	// JWT verification key. required.
	JWTVerificationKey string `mapstructure:"jwt_verification_key"`
	// Image path
	DataPath string `mapstructure:"data_path"`
	// Image path
	ImagePath string `mapstructure:"image_path"`
	// Image path
	StaticPath string `mapstructure:"static_path"`
	// Index file
	HttpIndex string `mapstructure:"http_index"`
	// Href
	HttpHref string `mapstructure:"http_href"`
	// Href
	DataImageUrl string `mapstructure:"data_image_url"`
	// SMTP
	SMTP util.Smtp `mapstructure:"smtp"`
	// Facebook redirect url
	FacebookRedirectUrl string `mapstructure:"facebook_redirect_url"`
}

func (config appConfig) Validate() error {
	return validation.ValidateStruct(&config,
		validation.Field(&config.DSN, validation.Required),
		validation.Field(&config.JWTSigningKey, validation.Required),
		validation.Field(&config.JWTVerificationKey, validation.Required),
	)
}

// LoadConfig loads configuration from the given list of paths and populates it into the Config variable.
// The configuration file(s) should be named as app.yaml.
// Environment variables with the prefix "RESTFUL_" in their names are also read automatically.
func LoadConfig(configPaths ...string) error {
	v := viper.New()
	v.SetConfigName("app")
	v.SetConfigType("yaml")
	v.SetEnvPrefix("restful")
	v.AutomaticEnv()
	v.SetDefault("error_file", "config/errors.yaml")
	v.SetDefault("server_port", 8080)
	v.SetDefault("jwt_signing_method", "HS256")
	v.SetDefault("data_path", "data")
	v.SetDefault("image_path", "img")
	//v.SetDefault("image_path", )
	v.SetDefault("static_path", "./ui/")
	v.SetDefault("http_index", "index.html")
	v.SetDefault("http_href", "/")
	v.SetDefault("data_image_url", v.GetString("data_path") + "/" +  v.GetString("image_path"))
	v.SetDefault("smtp", util.Smtp{"localhost", "", "", 25})

	for _, path := range configPaths {
		v.AddConfigPath(path)
	}
	if err := v.ReadInConfig(); err != nil {
		return fmt.Errorf("Failed to read the configuration file: %s", err)
	}
	if err := v.Unmarshal(&Config); err != nil {
		return err
	}
	return Config.Validate()
}

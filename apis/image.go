package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"fmt"
	"kassar/app"
	"kassar/modules/uploader"
)

type (
	imageResource struct {
	}
)

func ServeImageResource(rg *routing.RouteGroup) {
	r := &imageResource{}
	rg.Post("/images", r.uploadImage)
}

func (r *imageResource) uploadImage(c *routing.Context) error {
	if err := c.Request.ParseMultipartForm(32 << 20); err != nil {
		fmt.Println(err)
	}

	file, handler, err := c.Request.FormFile("file")

	if err != nil {
		fmt.Println(err)
		return routing.NewHTTPError(400)
	}

	defer file.Close()

	fileName := handler.Filename
	path := app.Config.ImagePath + "/product/"

	newFileName, ext, _ := uploader.SaveFile(path, fileName, file)

	imagePath := app.Config.DataPath + "/" + path + newFileName + ext

	type uploaderAnswer struct {
		Status        bool   `json:"status"`
		OriginalName  string `json:"originalName"`
		Extension     string `json:"extension"`
		GeneratedName string `json:"generatedName"`
		Msg           string `json:"msg"`
		ImageUrl      string `json:"imageUrl"`
	}
	a := &uploaderAnswer{}

	if err != nil {
		a.Msg = "No file uploaded"
	} else {
		a.GeneratedName = newFileName
		a.OriginalName = fileName
		a.Extension = ext
		a.Status = true
		a.ImageUrl = imagePath
		a.Msg = "Image upload successful"
	}

	return c.Write(a)
}

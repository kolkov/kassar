package uploader

import (
	"os"
	"path/filepath"
	"github.com/satori/go.uuid"
	"fmt"
	"io"
	"mime/multipart"
	"kassar/app"
)

func SaveFile(path, fileName string, file multipart.File) (string, string, int64) {
	fullPath := "./" + app.Config.DataPath + "/" + path
	if _, err := os.Stat(fullPath); err != nil {
		if os.IsNotExist(err) {
			// file does not exist
			os.MkdirAll(fullPath, 0777)
		} else {
			// other error
			fmt.Println(err)
		}
	}

	ext := filepath.Ext(fileName)
	newFileName := uuid.NewV4().String()

	f, err := os.OpenFile(fullPath + newFileName + ext, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println(err)
		return "", "", 0
	}
	defer f.Close()

	written, err := io.Copy(f, file)

	if err != nil {
		fmt.Println("Error saving image to disk")
		return "", "", 0
	}

	return newFileName, ext, written
}

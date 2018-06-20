package uploader

import (
	"os"
	"path/filepath"
	"github.com/satori/go.uuid"
	"fmt"
	"io"
	"mime/multipart"
	"inframe/app"
)

func SaveFile(path, fileName string, file multipart.File) (string, string, int64) {
	dataPath := "." + app.Config.DataPath
	if _, err := os.Stat(dataPath + path); err != nil {
		if os.IsNotExist(err) {
			// file does not exist
			os.MkdirAll(dataPath + path, 0777)
		} else {
			// other error
		}
	}

	ext := filepath.Ext(fileName)
	newFileName := uuid.NewV4().String()

	f, err := os.OpenFile(dataPath + path + newFileName + ext, os.O_WRONLY|os.O_CREATE, 0666)
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

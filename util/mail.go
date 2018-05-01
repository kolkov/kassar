package util

import (
	"bytes"
	"html/template"
	"log"
	"net/smtp"
	"strconv"
)

type Smtp struct {
	Username string
	Password string
	Server   string
	Port     int
}

type SmtpTemplateData struct {
	From    string
	To      []string
	Subject string
	Body    string
}

const emailTemplate = `From: {{.From}}
To: {{range .To}}{{.}}, {{end}}
Subject: {{.Subject}}

{{.Body}}
`

func Send(s Smtp, emailFrom string, emailTo []string, subject, body string) error {
	var msg bytes.Buffer
	var err error

	//var templTo string

	context := &SmtpTemplateData{
		emailFrom,
		emailTo,
		subject,
		body,
	}
	t := template.New("emailTemplate")
	t, err = t.Parse(emailTemplate)
	if err != nil {
		log.Print("error trying to parse mail template")
	}
	err = t.Execute(&msg, context)
	if err != nil {
		log.Print("error trying to execute mail template")
	}

	auth := smtp.PlainAuth("", s.Username, s.Password, s.Server)

	//to := []string{emailTo}

	err = smtp.SendMail(s.Server+":"+strconv.Itoa(s.Port), auth, emailFrom, emailTo, msg.Bytes())

	if err != nil {
		log.Print(err)
	}
	return err
}

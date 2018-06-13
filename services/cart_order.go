package services

import (
	"kassar/models"
	"kassar/app"
	"github.com/jordan-wright/email"
	"net/smtp"
	"fmt"
)

type cartOrderDAO interface {
	Get(rs app.RequestScope, id int) (*models.Order, error)
	Create(rs app.RequestScope, artist *models.Order) error
	GetEmail(rs app.RequestScope, id int) (*[]models.CartOrderItemEmail, error)
	/*GetByPath(scope app.RequestScope, id string) (*models.Order,error)
	// Count returns the number of artists.
	Count(rs app.RequestScope, id int) (int, error)
	// Query returns the list of artists with the given offset and limit.
	Query(rs app.RequestScope, offset, limit, id int) ([]models.Order, error)*/
}

type CartOrderService struct {
	dao cartOrderDAO
}

func NewCartOrderService(dao cartOrderDAO) *CartOrderService{
	return &CartOrderService{dao}
}

func (s *CartOrderService) Get(rs app.RequestScope, id int) (*models.Order, error) {
	return s.dao.Get(rs, id)
}

func (s *CartOrderService) Create(rs app.RequestScope, model *models.Order) (*models.Order, error) {
	if err := model.Validate(); err != nil {
		return nil, err
	}
	if err := s.dao.Create(rs, model); err != nil {
		return nil, err
	}
	return s.dao.Get(rs, model.Id)
}

func (s *CartOrderService) GetEmail(rs app.RequestScope, id int) (*[]models.CartOrderItemEmail, error) {
	return s.dao.GetEmail(rs, id)
}



func SendEmail(cart *models.Order, customer *models.Customer, items *[]models.CartOrderItemEmail){
	e := email.NewEmail()
	e.From = "Kassar.ru <info@kassar.ru>"
	e.To = []string{customer.Email}
	//e.Bcc = []string{"a.kolkov@gmail.com"}
	//e.Cc = []string{"info@kassar.ru"}
	e.Subject = "Новый заказ в магазине"
	//e.Text = []byte("Text Body is, of course, supported!")
	message := fmt.Sprintf("<h1>Поздравляем, %s, Вы сделали заказ на нашем сайте Кассар!</h1>", customer.FirstName)
	message += fmt.Sprintf("<p>Ваш номер заказа: %d </p>", cart.Id)
	message += fmt.Sprintf("<p>Данные клиента: %s %s </p>", customer.FirstName, customer.LastName)
	message += fmt.Sprintf("<p>телефон: %s, email: %s </p>", customer.Phone, customer.Email)
	for i, j := range *items {
		message += fmt.Sprintf("<p>%d. Модель: %s, количество: %d </p>", i+1, j.Name, j.Quantity)
	}
	message += fmt.Sprintf("<p>Всего по оборудованию: %6.2f </p>", cart.Total)
	message += fmt.Sprintf("<p>Общая сумма заказа: %6.2f </p>", cart.GrossTotal)
	message += "<p>Наши менеджеры связутся с вами в самое ближайшее время.</p>"
	message += "<p>Любим вас!</p>"
	e.HTML = []byte(message)
	err := e.Send("smtp.gmail.com:587", smtp.PlainAuth("", "info@kassar.ru", "kassar54321", "smtp.gmail.com"))
	if err != nil {
		panic(err)
	}
}

func SendEmail2(cart *models.Order, customer *models.Customer, items *[]models.CartOrderItemEmail){
	e := email.NewEmail()
	e.From = "Kassar.ru <info@kassar.ru>"
	e.To = []string{"Edya161@gmail.com "}
	e.Bcc = []string{"a.kolkov@gmail.com"}
	e.Cc = []string{"info@kassar.ru"}
	e.Subject = "Новый заказ в магазине"
	//e.Text = []byte("Text Body is, of course, supported!")
	message := "<h1>Поздравляем, у нас сделали заказ!</h1>"
	message += fmt.Sprintf("<p>Номер заказа: %d </p>", cart.Id)
	message += fmt.Sprintf("<p>Данные клиента: %s %s </p>", customer.FirstName, customer.LastName)
	message += fmt.Sprintf("<p>телефон: %s, email: %s </p>", customer.Phone, customer.Email)
	for i, j := range *items {
		message += fmt.Sprintf("<p>%d. Модель: %s, количество: %d </p>", i+1, j.Name, j.Quantity)
	}
	message += fmt.Sprintf("<p>Всего по оборудованию: %6.2f </p>", cart.Total)
	message += fmt.Sprintf("<p>Общая сумма заказа: %6.2f </p>", cart.GrossTotal)
	message += "<p>Нам нужно связатся с покупателем в самое ближайшее время.</p>"
	message += "<p>Мы любим его!</p>"
	e.HTML = []byte(message)
	err := e.Send("smtp.gmail.com:587", smtp.PlainAuth("", "info@kassar.ru", "kassar54321", "smtp.gmail.com"))
	if err != nil {
		panic(err)
	}
}
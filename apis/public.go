package apis

import (
	"github.com/go-ozzo/ozzo-routing"
)

/*type publicResource struct {
	articleService articleService
}*/

func ServPublicResource(rg *routing.RouteGroup,
	newsService newsService,
	articleService articleService,
	productService productService,
	productPropertiesService productPropertiesService,
	paymentOptionsService paymentOptionService,
		cartOrderService cartOrderService,
			cartOrderItemService cartOrderItemService, cartOrderCustomerService cartOrderCustomerService) {
		newsResource := &newsResource{newsService}
		articleResource := &articleResource{articleService}
		productResource := &productResource{productService, productPropertiesService}
		paymentOptionsResource := &paymentOptionResource{paymentOptionsService}
		cartOrderResource := &cartOrderResource{cartOrderService, cartOrderItemService, cartOrderCustomerService}

		rg.Get("/news/<id>", newsResource.get)
		rg.Get("/news", newsResource.query)

		rg.Get("/articles/<id>", articleResource.get)
		rg.Get("/article/<id>", articleResource.getByPath)
		rg.Get("/articles", articleResource.query)

		rg.Get("/products/<id>", productResource.getByPath)
		rg.Get("/products", productResource.query)

		rg.Get("/payment-options", paymentOptionsResource.query)

		rg.Post("/orders", cartOrderResource.create)
}

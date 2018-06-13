package apis

import (
	"github.com/go-ozzo/ozzo-routing"
)

func ServPublicResource(rg *routing.RouteGroup,
	newsService newsService,
	articleService articleService,
	productService productService,
	productPropertiesService productPropertiesService,
	paymentOptionsService paymentOptionService,
		cartOrderService cartOrderService,
			cartOrderItemService cartOrderItemService, cartOrderCustomerService cartOrderCustomerService,
				productCategoryService productCategoryService,
	articleCategoryService articleCategoryService,
		additionalOptionService additionalOptionService,
	deliveryOptionService deliveryOptionService, service addressService, service2 deliveryAddressService, mapService orderCustomerMapService) {
		newsResource := &newsResource{newsService}
		articleResource := &articleResource{articleService}
		productResource := &productResource{productService, productPropertiesService, productCategoryService}
		paymentOptionsResource := &paymentOptionResource{paymentOptionsService}
		cartOrderResource := &cartOrderResource{cartOrderService, cartOrderItemService, cartOrderCustomerService,
			service, service2, mapService}
		productCategoryResource := &productCategoryResource{productCategoryService}
		articleCategoryResource := &articleCategoryResource{articleCategoryService}
		additionalOptionsResource := &additionalOptionResource{additionalOptionService}
	deliveryOptionsResource := &deliveryOptionResource{deliveryOptionService}

		rg.Get("/news/<id>", newsResource.get)
		rg.Get("/news", newsResource.query)

		rg.Get("/articles/<id>", articleResource.get)
		rg.Get("/article/<id>", articleResource.getByPath)
		rg.Get("/articles", articleResource.query)

		rg.Get("/products/<id>", productResource.getByPath)
		rg.Get("/products", productResource.query)
		rg.Get("/products-by-path", productResource.queryByPath)

		rg.Get("/payment-options", paymentOptionsResource.query)
		rg.Get("/additional-options", additionalOptionsResource.query)
		rg.Get("/delivery-options", deliveryOptionsResource.query)

		rg.Post("/orders", cartOrderResource.create)

		rg.Get("/product-categories/<id>", productCategoryResource.get)
		rg.Get("/product-category/<id>", productCategoryResource.getByPath)
		rg.Get("/product-categories", productCategoryResource.query)

	rg.Get("/article-categories/<id>", articleCategoryResource.get)
	rg.Get("/article-category/<id>", articleCategoryResource.getByPath)
	rg.Get("/article-categories", articleCategoryResource.query)
}

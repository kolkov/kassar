package apis

import (
	"github.com/go-ozzo/ozzo-routing"
	"github.com/ikeikeikeike/go-sitemap-generator/stm"
	"kassar/app"
	"kassar/daos"
	"time"
)

func Sitemap(timeStart time.Time) routing.Handler {
	return func(c *routing.Context) error {
		rs := app.GetRequestScope(c)

		sm := stm.NewSitemap()
		sm.SetDefaultHost("https://kassar.ru")

		sm.Create()
		sm.Add(stm.URL{"loc": "/", "changefreq": "daily", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/company", "changefreq": "monthly", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/company/about", "changefreq": "monthly", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/company/news", "changefreq": "weekly", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/company/contacts", "changefreq": "monthly", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/services", "changefreq": "monthly", "lastmod": timeStart})
		sm.Add(stm.URL{"loc": "/service-center", "changefreq": "monthly", "lastmod": timeStart})

		sm.Add(stm.URL{"loc": "/articles", "changefreq": "weekly", "lastmod": timeStart})

		articleCategoryDAO := daos.NewArticleCategoryDAO()
		articleDAO := daos.NewArticleDAO()
		data, err := articleCategoryDAO.Query(rs, 0, 1000)
		if err == nil {
			for _, category := range data {
				sm.Add(stm.URL{"loc": "/articles/" + category.Path, "changefreq": "weekly", "lastmod": category.UpdatedAt})
				articles, err := articleDAO.Query(rs, 0, 10000, category.Id, "asc", "")
				if err == nil {
					for _, article := range articles {
						sm.Add(stm.URL{"loc": "/articles/" + category.Path + "/" + article.Path, "changefreq": "weekly", "lastmod": article.UpdatedAt})
					}
				}
			}
		}
		sm.Add(stm.URL{"loc": "/catalog", "changefreq": "weekly", "lastmod": timeStart})
		productCategoryDAO := daos.NewProductCategoryDAO()
		productDAO := daos.NewProductDAO()
		productCategories, err := productCategoryDAO.Query(rs, 0, 1000)
		if err == nil {
			for _, category := range productCategories {
				sm.Add(stm.URL{"loc": "/catalog/" + category.Path, "changefreq": "weekly", "lastmod": category.UpdatedAt})
				products, err := productDAO.Query(rs, 0, 10000, category.Id)
				if err == nil {
					for _, product := range products {
						sm.Add(stm.URL{"loc": product.Url, "changefreq": "weekly", "lastmod": product.UpdatedAt})
					}
				}
			}
		}

		return c.Write(sm.XMLContent())
	}
}

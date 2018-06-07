import {SafeHtml} from "@angular/platform-browser";

export class Article {
  id: number;
  path: string;
  date: string;
  title: string;
  introduction: string;
  metaDescription: string;
  metaKeywords: string;
  body: string;
  safeHTML: SafeHtml;
}

export class ArticleListItem {
  id: number;
  path: string;
  title: string;
  date: string;
  body: string;
}

export class ArticleList {
  items: ArticleListItem[];
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
}


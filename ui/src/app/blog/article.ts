export class Article {
  id: number;
  path: string;
  date: string;
  title: string;
  introduction: string;
  body: string;
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
  total: number;
}

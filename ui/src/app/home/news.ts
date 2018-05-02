export class NewsItem {
  id: number;
  date: string;
  heading: string;
  body: string;
}

export class NewsList {
  items: NewsItem[];
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
}

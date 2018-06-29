import {ArticleListItem} from "../../../../../src/app/blog/article";

export class Order {
  id: number;
  fio: string;
}

export interface OrderListItem {
  id: number;
  fio: string;
}

export interface OrderList {
  items: OrderListItem[];
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
}

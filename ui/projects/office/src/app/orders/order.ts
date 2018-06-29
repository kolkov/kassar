import {ArticleListItem} from "../../../../../src/app/blog/article";

export class Order {
  id: number;
  fio: string;
  itemsTotal: string;
  grossTotal: number;
  date: string;
  note: string;
}

export interface OrderListItem {
  id: number;
  fio: string;
  grossTotal: number;
}

export interface OrderList {
  items: OrderListItem[];
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
}

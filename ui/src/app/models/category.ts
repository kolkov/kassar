export interface PageDescription {
  heading: string;
  description: string;
  tags: TagItem;
}

export interface TagItem {
  description: string;
  keywords: string;
}

export interface Category {
  id: number;
  name: string;
  nickname?: string;
  description?: string;
  introduction?: string;
  metaDescription?: string;
  metaKeywords?: string;
  image?: string;
  path?: string;
}

export interface CategoryList {
  items: Category[];
  page: number;
  page_count: number;
  per_page: number;
  total_count: number;
}

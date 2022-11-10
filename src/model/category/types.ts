export interface ICategoryResponse {
  id?: number;
  name?: string;
  slug?: string;
  parent?: number;
  description?: string;
  display?: string;
  image?: IImageClassResponse;
  menu_order?: number;
  count?: number;
  _links?: ILinksResponse;
}

export interface ILinksResponse {
  self?: ICollectionResponse[];
  collection?: ICollectionResponse[];
  up?: ICollectionResponse[];
}

export interface ICollectionResponse {
  href?: string;
}

export interface IImageClassResponse {
  id?: number;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
  src?: string;
  name?: string;
  alt?: string;
}

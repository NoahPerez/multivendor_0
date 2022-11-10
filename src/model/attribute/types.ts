export interface IAttributesResponse {
  id?: number;
  name?: string;
  slug?: string;
  type?: string;
  order_by?: string;
  has_archives?: boolean;
  _links?: ILinksResponse;
}

export interface ILinksResponse {
  self?: ICollectionResponse[];
  collection?: ICollectionResponse[];
}

export interface ICollectionResponse {
  href?: string;
}

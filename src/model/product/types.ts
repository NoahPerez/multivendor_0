export interface IProductsResponse {
  id?: number;
  name?: string;
  slug?: string;
  permalink?: string;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
  type?: IProductTypeResponse;
  status?: IProductStatusResponse;
  featured?: boolean;
  catalog_visibility?: IProductCatalogVisibilityResponse;
  description?: string;
  short_description?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  date_on_sale_from?: null;
  date_on_sale_from_gmt?: null;
  date_on_sale_to?: null;
  date_on_sale_to_gmt?: null;
  on_sale?: boolean;
  purchasable?: boolean;
  total_sales?: number | string;
  virtual?: boolean;
  downloadable?: boolean;
  downloads?: any[];
  download_limit?: number;
  download_expiry?: number;
  external_url?: string;
  button_text?: string;
  tax_status?: IProductTaxStatusResponse;
  tax_class?: string;
  manage_stock?: boolean;
  stock_quantity?: number | null;
  backorders?: IProductBackordersResponse;
  backorders_allowed?: boolean;
  backordered?: boolean;
  low_stock_amount?: null;
  sold_individually?: boolean;
  weight?: string;
  dimensions?: IProductDimensionsResponse;
  shipping_required?: boolean;
  shipping_taxable?: boolean;
  shipping_class?: string;
  shipping_class_id?: number;
  reviews_allowed?: boolean;
  average_rating?: string;
  rating_count?: number;
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  parent_id?: number;
  purchase_note?: string;
  categories?: IProductCategoryResponse[];
  tags?: IProductCategoryResponse[];
  images?: IProductImageResponse[];
  attributes?: IProductAttributeResponse[];
  default_attributes?: IProductDefaultAttributeResponse[];
  variations?: number[];
  grouped_products?: any[];
  menu_order?: number;
  price_html?: string;
  related_ids?: number[];
  meta_data?: IProductMetaDatumResponse[];
  stock_status?: IProductStockStatusResponse;
  has_options?: boolean;
  product_variations: IProductProductVariationResponse[];
  _links?: IProductLinksResponse;
}

export interface IProductLinksResponse {
  self?: IProductCollectionResponse[];
  collection?: IProductCollectionResponse[];
}

export interface IProductCollectionResponse {
  href?: string;
}

export interface IProductAttributeResponse {
  id?: number;
  name?: string;
  position?: number;
  visible?: boolean;
  variation?: boolean;
  options?: string[];
}

export enum IProductBackordersResponse {
  No = 'no',
}

export enum IProductCatalogVisibilityResponse {
  Visible = 'visible',
}

export interface IProductCategoryResponse {
  id?: number;
  name?: string;
  slug?: string;
}

export interface IProductDefaultAttributeResponse {
  id?: number;
  name?: string;
  option?: string[];
}

export interface IProductDimensionsResponse {
  length?: string;
  width?: string;
  height?: string;
}

export interface IProductImageResponse {
  id?: number;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
  src?: string;
  name?: string;
  alt?: string;
}

export interface IProductMetaDatumResponse {
  id?: number;
  key?: IProductKeyResponse;
  value?: IProductValueResponse;
}

export enum IProductKeyResponse {
  EtPbFirstImage = '_et_pb_first_image',
  EtPbOldContent = '_et_pb_old_content',
  EtPbPageLayout = '_et_pb_page_layout',
  EtPbPostHideNav = '_et_pb_post_hide_nav',
  EtPbSideNav = '_et_pb_side_nav',
  EtPbTruncatePost = '_et_pb_truncate_post',
  EtPbTruncatePostDate = '_et_pb_truncate_post_date',
  EtPbUseBuilder = '_et_pb_use_builder',
}

export enum IProductValueResponse {
  Default = 'default',
  Empty = '',
  EtRightSidebar = 'et_right_sidebar',
  Off = 'off',
}

export interface IProductProductVariationResponse {
  id: number;
  on_sale?: boolean;
  regular_price?: number;
  sale_price?: number;
  sku?: string;
  stock?: number | string;
  image?: string;
  low_stock_amount?: string;
  weight?: string;
  dimensions?: IProductDimensionsResponse;
  shipping_class?: string;
  shipping_class_id?: number;
  attributes?: IProductVariationAttributeResponse[];
}

export interface IProductVariationAttributeResponse {
  name?: string;
  slug?: string;
  option?: string;
}

export enum IProductStatusResponse {
  Publish = 'publish',
  Draft = 'draft',
  Pending = 'pending',
  Private = 'private',
}

export enum IProductStockStatusResponse {
  Instock = 'instock',
  Outofstock = 'outofstock',
}

export enum IProductTaxStatusResponse {
  Taxable = 'taxable',
}

export enum IProductTypeResponse {
  Simple = 'simple',
  Variable = 'variable',
}

export interface IOrderResponse {
  id?: number;
  parent_id?: number;
  number?: string;
  order_key?: string;
  created_via?: string;
  version?: string;
  status?: string;
  currency?: string;
  date_created?: Date;
  date_created_gmt?: Date;
  date_modified?: Date;
  date_modified_gmt?: Date;
  discount_total?: string;
  discount_tax?: string;
  shipping_total?: string;
  shipping_tax?: string;
  cart_tax?: string;
  total?: string;
  total_tax?: string;
  prices_include_tax?: boolean;
  customer_id?: number;
  customer_ip_address?: string;
  customer_user_agent?: string;
  customer_note?: string;
  billing?: IShippingResponse;
  shipping?: IShippingResponse;
  payment_method?: string;
  payment_method_title?: string;
  transaction_id?: string;
  date_paid?: Date | null;
  date_paid_gmt?: Date | null;
  date_completed?: Date | null;
  date_completed_gmt?: Date | null;
  cart_hash?: string;
  meta_data?: MetaDatum[];
  line_items?: IORderItemResponse[];
  tax_lines?: ITaxLineResponse[];
  shipping_lines?: IShippingLineResponse[];
  fee_lines?: any[];
  coupon_lines?: any[];
  refunds?: Refund[];
  _links?: ILinksResponse;
}

export interface ILinksResponse {
  self?: ICollectionResponse[];
  collection?: ICollectionResponse[];
  customer?: ICollectionResponse[];
}

export interface ICollectionResponse {
  href?: string;
}

export interface IShippingResponse {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface IORderItemResponse {
  id?: number;
  name?: string;
  product_id?: number;
  variation_id?: number;
  quantity?: number;
  tax_class?: string;
  subtotal?: string;
  subtotal_tax?: string;
  total?: string;
  total_tax?: string;
  taxes?: ITaxResponse[];
  meta_data?: MetaDatum[];
  sku?: string;
  price?: number;
}

export interface MetaDatum {
  id?: number;
  key?: string;
  value?: string;
}

export interface ITaxResponse {
  id?: number;
  total?: string;
  subtotal?: string;
}

export interface Refund {
  id?: number;
  refund?: string;
  total?: string;
}

export interface IShippingLineResponse {
  id?: number;
  method_title?: string;
  method_id?: string;
  total?: string;
  total_tax?: string;
  taxes?: any[];
  meta_data?: MetaDatum[];
}

export interface ITaxLineResponse {
  id?: number;
  rate_code?: string;
  rate_id?: number;
  label?: string;
  compound?: boolean;
  tax_total?: string;
  shipping_tax_total?: string;
  meta_data?: any[];
}

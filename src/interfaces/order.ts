import { IAttributeCart, IAttributesProps } from './cart';

export interface IOrder {
  id: number;
  order_key: string;
  status: string;
  currency: string;
  discount_total: number;
  discount_tax: number;
  shipping_total: number;
  shipping_tax: number;
  cart_tax: number;
  subTotal: number;
  tax: number;
  total: number;
  customer_id: number;
  billing: IBilling;
  shipping: IShipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: Date | null;
  date_completed: Date | null;
  orderItems: IOrderItem[];
  tax_lines: ITaxLine[];
  shipping_lines: IShippingLine[];
  coupon_line: any[];
  numberOfItems: number;
}

export interface IOrderItem {
  id: number;
  title: string;
  product_id: number;
  id_variation?: number;
  quantity: number;
  image: string;
  tax_class?: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax?: string;
  taxes?: ITaxOrderItem[];
  sku?: string;
  price: number;
  slug: string;
  attributesNames: IAttributesProps[];
  attributes?: IAttributeCart;
}

export interface IBilling {
  firstName: string;
  lastName: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
  phone?: string;
}

export type IShipping = Omit<IBilling, 'email' | 'phone'>;

export type IOrderIDs = Pick<IOrder, 'id'>;

export interface ITaxOrderItem {
  id: number;
  total: string;
  subtotal: string;
}

export interface ITaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
}
export interface IShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
}

import {
  IOrderResponse,
  IShippingResponse,
  IORderItemResponse,
  MetaDatum,
  ITaxLineResponse,
  IShippingLineResponse,
  Refund,
  ILinksResponse,
} from './types';

export class OrderResponse {
  id?: number;
  order_key?: string;
  status?: string;
  currency?: string;
  discount_total?: number;
  discount_tax?: number;
  shipping_total?: number;
  shipping_tax?: number;
  cart_tax?: number;
  subTotal?: number;
  tax?: number;
  total?: number;
  customer_id?: number;
  billing?: IShippingResponse;
  shipping?: IShippingResponse;
  payment_method?: string;
  payment_method_title?: string;
  transaction_id?: string;
  date_paid?: Date | null;
  date_completed?: Date | null;
  line_items?: IORderItemResponse[];
  tax_lines?: IORderItemResponse[];
  shipping_lines?: IShippingLineResponse[];
  coupon_line?: any[];
  numberOfItems?: number;

  constructor({
    id,
    order_key,
    status,
    currency,
    discount_total,
    discount_tax,
    shipping_total,
    shipping_tax,
    cart_tax,
    total,
    total_tax,
    customer_id,
    billing,
    shipping,
    payment_method,
    payment_method_title,
    transaction_id,
    date_paid,
    date_completed,
    line_items,
    tax_lines,
    shipping_lines,
    coupon_lines,
  }: IOrderResponse = {}) {
    this.id = id;
    this.order_key = order_key;
    this.status = status;
    this.currency = currency;
    this.discount_total = Number(discount_total);
    this.discount_tax = Number(discount_tax);
    this.shipping_total = Number(shipping_total);
    this.shipping_tax = Number(shipping_tax);
    this.cart_tax = Number(cart_tax);
    this.subTotal = Number(total);
    this.tax = Number(total_tax);
    this.total = Number(total) + Number(total_tax);
    this.customer_id = customer_id;
    this.billing = billing;
    this.shipping = shipping;
    this.payment_method = payment_method;
    this.payment_method_title = payment_method_title;
    this.transaction_id = transaction_id;
    this.date_paid = date_paid;
    this.date_completed = date_completed;
    this.line_items = line_items;
    this.tax_lines = tax_lines;
    this.shipping_lines = shipping_lines;
    this.coupon_line = coupon_lines;
    this.numberOfItems = line_items?.reduce(
      (prev, current: IORderItemResponse) => prev + (current.quantity || 0),
      0
    );
  }
}

// module.exports = {
//   OrderResponse,

// };

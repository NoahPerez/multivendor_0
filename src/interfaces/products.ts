export interface IProduct {
  id: number;
  name: string;
  description: string;
  slug: string;
  images: IProductImage[];
  short_description: string;
  sku: string;
  price: number;
  regular_price: number;
  sale_price: number;
  type: IProductType;
  tags: IProductTag[];
  status: IProductStatus;
  stock_quantity: number | null;
  weight?: string;
  dimensions?: IProductDimensions;
  tax_status: IProductTaxStatus;
  tax_class: string;
  low_stock_amount: number | null;
  sold_individually: boolean;
  product_variations: IProductVariation[];
  attributes: IProductAttribute[];
  variations: number[];
  stock_status: IProductStockStatus;
  total_sales?: number;
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  categories?: IProductCategory[];
  related_ids?: number[];
  shipping_required?: boolean;
  shipping_taxable?: boolean;
  shipping_class?: string;
  shipping_class_id?: number;
}

export enum IProductType {
  Simple = 'simple',
  Variable = 'variable',
}

export interface IProductImage {
  id: number;
  src: string;
  name?: string;
  alt?: string;
}

export enum IProductStatus {
  Publish = 'publish',
  Draft = 'draft',
  Pending = 'pending',
  Private = 'private',
}

export interface IProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface IProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface IProductDimensions {
  length?: string;
  width?: string;
  height?: string;
}
export enum IProductTaxStatus {
  Taxable = 'taxable',
  Shipping = 'shipping',
  None = 'none',
}

export interface IProductVariation {
  id: number;
  on_sale?: boolean;
  regular_price?: number;
  sale_price: number;
  sku?: string;
  stock?: number | string;
  image?: string;
  low_stock_amount?: string;
  weight?: string;
  dimensions?: IProductDimensions;
  shipping_class?: string;
  shipping_class_id?: number;
  attributes?: IProductVariationAttribute[];
}

export interface IProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
  slug?: string;
  has_archives?: boolean;
  type?: string;
  order_by?: string;
}

export interface IProductVariationAttribute {
  name?: string;
  slug?: string;
  option?: string;
}

export enum IProductStockStatus {
  Instock = 'instock',
  Outofstock = 'outofstock',
}

export interface IProductSlugs {
  slugs: string;
}

//PRODUCT VARIATED
export interface IPropsProductVariated {
  id?: number;
  id_variation?: number;
  type?: string;
  price?: number;
  regular_price?: number;
  name?: string;
  description?: string;
  attributes?: string[];
  props: IAttrPropsProductVariated;
  propsMap: IAttrPropsMapProductVariated;
}

export interface IAttrPropsProductVariated {
  [key: string]: (string | undefined)[];
}
export interface IAttrPropsMapProductVariated {
  [key: string]: {
    [key: string]: {
      [key: string]: string[];
    };
  };
}

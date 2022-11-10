import {
  IProductAttributeResponse,
  IProductCategoryResponse,
  IProductDimensionsResponse,
  IProductImageResponse,
  IProductProductVariationResponse,
  IProductsResponse,
  IProductStockStatusResponse,
  IProductTaxStatusResponse,
  IProductTypeResponse,
} from './types';

export class ProductResponse {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  type?: IProductTypeResponse;
  tags?: IProductCategoryResponse[];
  price?: number;
  regular_price?: number;
  sale_price?: number;
  total_sales?: number;
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  categories?: IProductCategoryResponse[];
  images?: IProductImageResponse[];
  variations?: number[];
  related_ids?: number[];
  attributes?: IProductAttributeResponse[];
  stock_status?: IProductStockStatusResponse;
  stock_quantity?: number | null;
  product_variations?: IProductProductVariationResponse[];
  tax_status?: IProductTaxStatusResponse;
  tax_class?: string;
  low_stock_amount?: null;
  weight?: string;
  dimensions?: IProductDimensionsResponse;
  shipping_required?: boolean;
  shipping_taxable?: boolean;
  shipping_class?: string;
  shipping_class_id?: number;

  constructor({
    slug,
    id,
    name,
    description,
    short_description,
    tags,
    type,
    price,
    regular_price,
    sale_price,
    total_sales,
    cross_sell_ids,
    upsell_ids,
    categories,
    images,
    variations,
    related_ids,
    attributes,
    stock_status,
    stock_quantity,
    product_variations,
    tax_status,
    tax_class,
    low_stock_amount,
    weight,
    dimensions,
    shipping_required,
    shipping_taxable,
    shipping_class,
    shipping_class_id,
  }: IProductsResponse) {
    this.slug = slug;
    this.id = id;
    this.name = name;
    this.description = description;
    this.short_description = short_description;
    this.tags = tags;
    this.type = type;
    this.price = Number(price);
    this.regular_price = Number(regular_price);
    this.sale_price = Number(sale_price);
    this.total_sales = Number(total_sales);
    this.cross_sell_ids = cross_sell_ids;
    this.upsell_ids = upsell_ids;
    this.categories = categories;
    this.images = images;
    this.variations = variations;
    this.related_ids = related_ids;
    this.attributes = attributes;
    this.stock_status = stock_status;
    this.stock_quantity = stock_quantity;
    this.product_variations = product_variations;
    this.tax_status = tax_status;
    this.tax_class = tax_class;
    this.low_stock_amount = low_stock_amount;
    this.weight = weight;
    this.dimensions = dimensions;
    this.shipping_required = shipping_required;
    this.shipping_taxable = shipping_taxable;
    this.shipping_class = shipping_class;
    this.shipping_class_id = shipping_class_id;
  }
}

export class ProductResponseSlug {
  slug?: string;

  constructor({ slug }: { slug?: string } = {}) {
    this.slug = slug;
  }
}
// module.exports = {
//   ProductResponse,
//   ProductResponseSlug
// };

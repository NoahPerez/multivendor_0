import {
  ProductResponse,
  ProductResponseSlug,
} from '../../../model/product/model';
import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';

import {
  IErrorResponseApiWoo,
  IProduct,
  IProductSlugs,
} from '../../../interfaces';
import { IProductsResponse } from '../../../model/product/types';

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get('products', {
      slug: slug,
    });

    let product: IProductsResponse = data[0];

    if (product.type === 'simple') {
      if (!product.price) {
        return {
          message: 'No se pudo obtener el porducto por slug',
          body: null,
        };
      }
    }

    if (product.type === 'variable') {
      product.product_variations = product.product_variations?.filter(
        (e: any) => e.sale_price > 0
      );

      if (!product.product_variations.length) {
        console.log('ENTRO A QUI');
        return {
          message: 'No se pudo obtener el porducto por slug',
          body: null,
        };
      }
    }

    let result = toResponseModel(product, ProductResponse);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudo obtener el porducto por slug',
      body: null,
    };
  }
};

export const getAllProductSlugs = async (): Promise<
  IProductSlugs[] | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('products');

    let productData: IProductsResponse[] = data;
    let result: IProduct[] = [];

    productData = productData.filter((prod) => {
      if (prod.type === 'simple') {
        return Number(prod.price) > 0;
      }
      if (prod.type === 'variable') {
        prod.product_variations = prod.product_variations?.filter(
          (e) => Number(e.sale_price) > 0
        );
        if (prod.product_variations?.length) {
          return {
            message: 'No se pudo obtener el porducto por Por categoria',
            body: null,
          };
        }
        return Number(prod.product_variations);
      }
    });

    productData.forEach((product: IProductsResponse) => {
      result.push(toResponseModel(product, ProductResponseSlug));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener todos los slugs de los productos',
      body: null,
    };
  }
};

export const getProductsByCategory0 = async (
  id: string
): Promise<IProduct[] | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get('products', {
      category: id,
    });

    let productData: IProductsResponse[] = data;
    let result: IProduct[] = [];

    productData = productData.filter((prod) => {
      if (prod.type === 'simple') {
        return Number(prod.price) > 0;
      }
      if (prod.type === 'variable') {
        prod.product_variations = prod.product_variations?.filter(
          (e) => Number(e.sale_price) > 0
        );
        if (prod.product_variations?.length) {
          return {
            message: 'No se pudo obtener el porducto por Por categoria',
            body: null,
          };
        }
        return Number(prod.product_variations);
      }
    });

    productData.forEach((product) => {
      result.push(toResponseModel(product, ProductResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener el producto por categoría',
      body: null,
    };
  }
};

export const getProductsbyTerm = async (
  term: string
): Promise<IProduct[] | IErrorResponseApiWoo> => {
  try {
    term = term.toString().toLowerCase();

    const { data } = await api.get('products');

    let productData: IProductsResponse[] = data;
    let result: IProduct[] = [];

    productData = productData.filter((prod) => {
      if (prod.type === 'simple') {
        return Number(prod.price) > 0;
      }
      if (prod.type === 'variable') {
        prod.product_variations = prod.product_variations?.filter(
          (e) => Number(e.sale_price) > 0
        );
        if (prod.product_variations?.length) {
          return {
            message: 'No se pudo obtener el porducto por Por term',
            body: null,
          };
        }
        return Number(prod.product_variations);
      }
    });

    const productSearchedBySlug = productData.filter(
      (product: IProductsResponse) => {
        return product.name?.toLowerCase().includes(term);
      }
    );
    const productSearchedByTags = productData.filter(
      (product: IProductsResponse) => {
        return product.tags?.some((e) => e.slug?.includes(term));
      }
    );

    let arrayProducts = [];
    arrayProducts = [...productSearchedBySlug, ...productSearchedByTags];

    arrayProducts.forEach((product) => {
      result.push(toResponseModel(product, ProductResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener el producto por categoría',
      body: null,
    };
  }
};

export const getAllProducts = async (
  params = {}
): Promise<IProduct[] | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get('products', {
      ...params,
    });

    let product: IProductsResponse[] = data;
    let result: IProduct[] = [];

    product = product.filter((prod) => {
      if (prod.type === 'simple') {
        return Number(prod.price) > 0;
      }
      if (prod.type === 'variable') {
        prod.product_variations = prod.product_variations?.filter(
          (e) => Number(e.sale_price) > 0
        );
        return prod.product_variations.length > 0;
      }
    });

    product.forEach((prod) => {
      result.push(toResponseModel(prod, ProductResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener el producto por categoría',
      body: null,
    };
  }
};

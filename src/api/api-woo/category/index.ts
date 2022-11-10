import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';
import {
  CategoryResponse,
  CategoryResponseSlugs,
} from '../../../model/category/model';
import {
  ICategory,
  ICategorySlug,
  IErrorResponseApiWoo,
} from '../../../interfaces';
import { ICategoryResponse } from '../../../model/category/types';

export const getCategoryParent0 = async (): Promise<
  ICategory | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('products/categories', {
      parent: 0,
    });

    let result: {}[] = [];
    data.forEach((category: ICategoryResponse) => {
      result.push(toResponseModel(category, CategoryResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudo obtener las categorias Parent0',
      body: error,
    };
  }
};

export const getCategoryBySlug = async (
  slug: string
): Promise<ICategory | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get('products/categories', {
      slug,
    });

    return toResponseModel(data[0], CategoryResponse);
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener las categorias by slugs',
      body: null,
    };
  }
};
export const getAllCategoriesSlugs = async (): Promise<
  ICategorySlug[] | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('products/categories', {
      parent: 0,
    });

    let result: ICategorySlug[] = [];
    data.forEach((category: ICategoryResponse) => {
      result.push(toResponseModel(category, CategoryResponseSlugs));
    });

    return result;
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener las categorias by slugs',
      body: null,
    };
  }
};

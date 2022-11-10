import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { wooCategories } from 'src/api';

export const fetchCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const data = await wooCategories.getCategoryParent0();
  console.log({ data });
  return { categories: { data: data as any } };
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  );
};

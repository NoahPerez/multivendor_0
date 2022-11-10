export interface ICategory {
  id: number;
  name: string;
  slug: string;
  parent: string;
  image: string;
  count: boolean;
}

export type ICategorySlug = Pick<ICategory, 'slug'>;

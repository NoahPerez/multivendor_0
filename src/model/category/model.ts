import { ICategoryResponse, IImageClassResponse } from './types';

export class CategoryResponse {
  name?: string;
  id?: number;
  slug?: string;
  parent?: number;
  image?: IImageClassResponse;
  count?: number;

  constructor({
    slug,
    id,
    name,
    parent,
    image,
    count,
  }: ICategoryResponse = {}) {
    this.slug = slug;
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.image = image;
    this.count = count;
  }
}

export class CategoryResponseSlugs {
  slug?: string[];

  constructor({ slug }: { slug?: string[] } = {}) {
    this.slug = slug;
  }
}

// module.exports = {
//   CategoryResponse,
//   CategoryResponseSlugs
// };

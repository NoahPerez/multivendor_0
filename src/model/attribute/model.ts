import { IAttributesResponse } from './types';

export class AttributeResponse {
  id?: number;
  name?: string;
  slug?: string;
  type?: string;
  order_by?: string;
  has_archives?: boolean;

  constructor({
    id,
    name,
    slug,
    type,
    order_by,
    has_archives,
  }: IAttributesResponse = {}) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.type = type;
    this.order_by = order_by;
    this.has_archives = has_archives;
  }
}

export interface ICartProduct {
  id: number;
  id_variation?: number;
  image: string;
  price: number;
  attributes: IAttributeCart;
  slug: string;
  title: string;
  quantity: number;
  attributesNames: IAttributesProps[];
}

export interface IAttributeCart {
  [key: string]: string | undefined;
}

export interface IAttributesProps {
  [key: string]: string;
}

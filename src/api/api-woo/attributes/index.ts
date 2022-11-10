import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';

import { AttributeResponse } from '../../../model/attribute/model';
import { IAttribute, IErrorResponseApiWoo } from '../../../interfaces';
import { IAttributesResponse } from '../../../model/attribute/types';

export const getAllAttributes = async (): Promise<
  IAttribute[] | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('products/attributes');

    let result: IAttribute[] = [];
    data.forEach((attr: IAttributesResponse) => {
      result.push(toResponseModel(attr, AttributeResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudo obtener todos los atributos',
      body: null,
    };
  }
};

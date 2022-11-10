import { OrderResponse } from '../../../model/order/model';
import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';
import { IErrorResponseApiWoo, IOrder, IOrderIDs } from '../../../interfaces';
import { IOrderResponse } from '../../../model/order/types';

export const getOrderById = async (
  id: string
): Promise<IOrder | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get(`orders/${id}`);

    if (!data.id) {
      return {
        message: 'No data',
        body: null,
      };
    }

    let result = toResponseModel(data, OrderResponse);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudo obtener las categorias Parent0',
      body: null,
    };
  }
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get('orders', {
      customer: parseInt(userId, 10),
    });

    if (!data.length) {
      return {
        message: 'No data',
        body: null,
      };
    }

    let result: IOrder[] = [];
    data.forEach((order: IOrderResponse) => {
      result.push(toResponseModel(order, OrderResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener las ordenes por usuario',
      body: null,
    };
  }
};

import { ShippingZoneResponse } from '../../../model/shipping/model';
import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';
import { IErrorResponseApiWoo, IShippingZones } from '../../../interfaces';
import { IShippingZonesResponse } from '../../../model/shipping/types';

export const getAllShippingZones = async (): Promise<
  IShippingZones | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('shipping/zones');

    if (!data.length) {
      return {
        message: 'No se pudo obtener las shipping zones',
        body: null,
      };
    }

    let result: IShippingZones[] = [];
    data.forEach((zone: IShippingZonesResponse) => {
      result.push(toResponseModel(zone, ShippingZoneResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return {
      message: 'No se pudo obtener las shipping zones',
      body: null,
    };
  }
};

import { IShippingZonesResponse } from './types';

export class ShippingZoneResponse {
  id?: number;
  name?: string;
  order?: number;

  constructor({ id, name, order }: IShippingZonesResponse = {}) {
    this.id = id;
    this.name = name;
    this.order = order;
  }
}

// module.exports = {
//   ShippingZoneResponse,

// };

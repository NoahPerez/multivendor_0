export interface IShippingZonesResponse {
  id?: number;
  name?: string;
  order?: number;
  _links?: IShippingZonesLinksResponse;
}

export interface IShippingZonesLinksResponse {
  self?: IShippingZonesCollection[];
  collection?: IShippingZonesCollection[];
  describedby?: IShippingZonesCollection[];
}

export interface IShippingZonesCollection {
  href?: string;
}

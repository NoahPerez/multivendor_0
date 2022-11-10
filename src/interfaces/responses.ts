import { IProduct } from '.';

export interface IResponseSuccess {
  status: number;
  success: boolean;
}

export interface IResponseSuccessProduct extends IResponseSuccess {
  body: IProduct[];
}

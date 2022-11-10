import {
  SettingsResponse,
  SettingsByIDResponse,
} from '../../../model/settings/model';
import { api } from '../api-woo';
import { toResponseModel } from '../../../model/mapper';
import {
  IErrorResponseApiWoo,
  ISetting,
  ISettingById,
} from '../../../interfaces';
import {
  ISettingsIDsResponse,
  ISettingsResponse,
} from '../../../model/settings/types';

export const getAllSettings = async (): Promise<
  ISetting | IErrorResponseApiWoo
> => {
  try {
    const { data } = await api.get('settings');

    if (!data.length) {
      return {
        message: 'No se pudieron listar todas las settings',
        body: null,
      };
    }

    let result: ISetting[] = [];
    data.forEach((zone: ISettingsResponse) => {
      result.push(toResponseModel(zone, SettingsResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudieron listar todas las settings',
      body: null,
    };
  }
};

export const getSettingById = async (
  id: string
): Promise<ISettingById[] | IErrorResponseApiWoo> => {
  try {
    const { data } = await api.get(`settings/${id}`);

    if (!data.length) {
      return {
        message: 'No se pudo obtener el setting por Id',
        body: null,
      };
    }

    let result: ISettingById[] = [];
    data.forEach((zone: ISettingsIDsResponse) => {
      result.push(toResponseModel(zone, SettingsByIDResponse));
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      message: 'No se pudo obtener el setting por Id',
      body: null,
    };
  }
};

import { ISettingsResponse, ISettingsIDsResponse } from './types';

export class SettingsResponse {
  id?: string;
  label?: string;
  description?: string;
  parent_id?: string;
  sub_groups?: string[];

  constructor({
    id,
    label,
    description,
    parent_id,
    sub_groups,
  }: ISettingsResponse = {}) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.parent_id = parent_id;
    this.sub_groups = sub_groups;
  }
}

export class SettingsByIDResponse {
  id?: string;
  label?: string;
  description?: string;
  options?: { [key: string]: string };
  tip?: string;
  value?: string;

  constructor({
    id,
    label,
    description,
    tip,
    value,
    options,
  }: ISettingsIDsResponse = {}) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.tip = tip;
    this.value = value;
    this.options = options;
  }
}

// module.exports = {
//   SettingsResponse,
//   SettingsByIDResponse

// };

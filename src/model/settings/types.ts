export interface ISettingsResponse {
  id?: string;
  label?: string;
  description?: string;
  parent_id?: string;
  sub_groups?: string[];
  _links?: ILinksResponse;
}

export interface ILinksResponse {
  options?: IOptionResponse[];
}

export interface IOptionResponse {
  href?: string;
}

export interface ISettingsIDsResponse {
  id?: string;
  label?: string;
  description?: string;
  type?: string;
  default?: string;
  options?: { [key: string]: string };
  tip?: string;
  value?: string;
  _links?: ISettingsIDsLinks;
}

export interface ISettingsIDsLinks {
  self?: ISettingsIDsCollection[];
  collection?: ISettingsIDsCollection[];
}

export interface ISettingsIDsCollection {
  href?: string;
}

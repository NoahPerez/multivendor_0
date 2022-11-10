export interface ISetting {
  id: string;
  label: string;
  description: string;
  parent_id: string;
  sub_groups: string[];
}

export interface ISettingById {
  id: string;
  label: string;
  description: string;
  options: { [key: string]: string };
  tip: string;
  value: string;
}

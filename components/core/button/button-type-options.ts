import { ButtonType } from "./button-type.type";

export const buttonTypeOptions: {
  key: string;
  value: ButtonType;
}[] = [
    {
      key: 'Default',
      value: 'default'
    },
    {
      key: 'Primary',
      value: 'primary'
    },
    {
      key: 'Dashed',
      value: 'dashed'
    },
    {
      key: 'Link',
      value: 'link'
    }
  ];

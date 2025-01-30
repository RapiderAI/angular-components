export interface CheckboxTableCheck {
  row: string;
  column: string;
  check: boolean;
  title?: string;
  [key: string]: unknown;
}

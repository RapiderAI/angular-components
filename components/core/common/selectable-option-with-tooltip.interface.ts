import { SelectableOption } from './selectable-option.interface';

export interface SelectableOptionWithTooltip extends SelectableOption {
  tooltipText?: string;
}
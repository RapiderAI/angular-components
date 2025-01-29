import { RadioGroupButtonStyle } from '../radio-group/radio-group-button-style.enum';
import { RadioGroupOptions } from '../radio-group/radio-group-options.interface';
import { RadioGroupSize } from '../radio-group/radio-group-size.enum';
import { CrudFormItem } from './crud-form-item.interface';

export interface CrudFormRadioGroupItem extends CrudFormItem {
    options: RadioGroupOptions[];
    cssStyle: { [key: string]: any };
    cssClass: string;
    invalidConfigText: string;
    size: RadioGroupSize;
    disabled: boolean;
    title: string;
    buttonStyle: RadioGroupButtonStyle;
}

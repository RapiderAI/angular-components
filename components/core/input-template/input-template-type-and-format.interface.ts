import { PropertyFormat } from "./property-format";
import { PropertyType } from "./property-type.enum";

export interface InputTemplateTypeAndFormat {
    type: PropertyType;
    format?: PropertyFormat;
}

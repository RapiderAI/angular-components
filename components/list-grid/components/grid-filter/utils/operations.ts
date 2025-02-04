import { CrudViewColumnType } from '../../../../../utils';
import { lowerCase } from 'lodash';
import * as moment from 'moment-timezone';

/* if you're changin the values of the other conditions which are commons, please also change here */
export enum CommonCondition {
  IsNotEmpty = 'is-not-empty',
  IsEmpty = 'is-empty',
  IsEqualTo = 'is-equal-to',
  IsNotEqualTo = 'is-not-equal-to'
}

export enum NumberCondition {
  IsEqualTo = 'is-equal-to',
  IsNotEqualTo = 'is-not-equal-to',
  LessThen = 'less-then',
  BiggerThen = 'bigger-then',
  IsEmpty = 'is-empty',
  IsNotEmpty = 'is-not-empty'
}

export function numberCondition(data: any[], condition: NumberCondition, filteredValue: number, fieldName: string) {
  if (condition === NumberCondition.IsEqualTo) {
    return data.filter(item => item[fieldName] === filteredValue);
  } else if (condition === NumberCondition.IsNotEqualTo) {
    return data.filter(item => item[fieldName] !== filteredValue);
  } else if (condition === NumberCondition.LessThen) {
    return data.filter(item => item[fieldName] < filteredValue);
  } else if (condition === NumberCondition.BiggerThen) {
    return data.filter(item => item[fieldName] > filteredValue);
  } else if (condition === NumberCondition.IsEmpty) {
    return data.filter(item => !item[fieldName]);
  } else if (condition === NumberCondition.IsNotEmpty) {
    return data.filter(item => item[fieldName]);
  } else {
    return data;
  }
}

export enum StringCondition {
  Contains = 'contains',
  IsEqualTo = 'is-equal-to',
  EndsWith = 'ends-with',
  StartsWith = 'starts-with',
  IsEmpty = 'is-empty',
  IsNotEmpty = 'is-not-empty'
}

export function stringCondition(data: any[], filteredValue: string, fieldName: string, condition: StringCondition) {
  /* replace(/\s/g, '') function removes white spaces */
  if (condition === StringCondition.IsEqualTo) {
    return data.filter(item => lowerCase(item[fieldName]).replace(/\s/g, '') === lowerCase(filteredValue).replace(/\s/g, ''));
  } else if (condition === StringCondition.Contains) {
    return data.filter(item => lowerCase(item[fieldName]).replace(/\s/g, '').includes(lowerCase(filteredValue).replace(/\s/g, '')));
  } else if (condition === StringCondition.EndsWith) {
    return data.filter(item => lowerCase(item[fieldName]).replace(/\s/g, '').endsWith(lowerCase(filteredValue).replace(/\s/g, '')));
  } else if (condition === StringCondition.StartsWith) {
    return data.filter(item => lowerCase(item[fieldName]).replace(/\s/g, '').startsWith(lowerCase(filteredValue).replace(/\s/g, '')));
  } else if (condition === StringCondition.IsEmpty) {
    return data.filter(item => !item[fieldName]);
  } else if (condition === StringCondition.IsNotEmpty) {
    return data.filter(item => item[fieldName]);
  } else {
    return data;
  }
}

export enum DateCondition {
  IsEqualTo = 'is-equal-to',
  IsNotEqualTo = 'is-not-equal-to',
  IsAfterOrEqualTo = 'is-after-or-equal-to',
  IsAfter = 'is-after',
  IsBeforeOrEqualTo = 'is-before-or-equal-to',
  IsBefore = 'is-before',
  IsEmpty = 'is-empty',
  IsNotEmpty = 'is-not-empty'
}


export function dateCondition(data: any[], filteredValue: Date, fieldName: string, condition: DateCondition) {
  if (condition === DateCondition.IsEqualTo) {
    return data.filter(item => moment(moment(item[fieldName]).format('LL')).isSame(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsAfter) {
    return data.filter(item => moment(moment(item[fieldName]).format('LL')).isAfter(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsAfterOrEqualTo) {
    return data.filter(item => moment(moment(item[fieldName]).format('LL')).isSameOrAfter(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsBefore) {
    return data.filter(item => moment(moment(item[fieldName]).format('LL')).isBefore(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsBeforeOrEqualTo) {
    return data.filter(item => moment(moment(item[fieldName]).format('LL')).isSameOrBefore(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsNotEqualTo) {
    return data.filter(item => !moment(moment(item[fieldName]).format('LL')).isSame(moment(moment(filteredValue).format('LL'))));
  } else if (condition === DateCondition.IsEmpty) {
    return data.filter(item => !item[fieldName]);
  } else if (condition === DateCondition.IsNotEmpty) {
    return data.filter(item => item[fieldName]);
  } else {
    return data;
  }
}

export enum BooleanCondition {
  IsEmpty = 'is-empty',
  IsNotEmpty = 'is-not-empty'
}

export function booleanCondition(data: any[], filteredValue: boolean, fieldName: string, condition?: BooleanCondition) {
  if (condition) {
    if (condition === BooleanCondition.IsEmpty) {
      return data.filter(item => item[fieldName] == null);
    } else if (condition === BooleanCondition.IsNotEmpty) {
      return data.filter(item => item[fieldName] != null);
    }
  } else {
    return data.filter(item => item[fieldName] === filteredValue);
  }
}

export const conditionMapping: any = [
  {
    type: CrudViewColumnType.Number,
    condition: NumberCondition,
    filterFunction: numberCondition
  },
  {
    type: CrudViewColumnType.Text,
    condition: StringCondition,
    filterFunction: stringCondition
  },
  {
    type: CrudViewColumnType.Link,
    condition: StringCondition,
    filterFunction: stringCondition
  },
  {
    type: CrudViewColumnType.Boolean,
    condition: BooleanCondition,
    filterFunction: booleanCondition
  },
  {
    type: CrudViewColumnType.Date,
    condition: DateCondition,
    filterFunction: dateCondition
  }
];

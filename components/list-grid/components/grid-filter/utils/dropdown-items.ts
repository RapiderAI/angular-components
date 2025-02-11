import { NumberCondition, StringCondition, DateCondition, BooleanCondition } from './operations';

export const numberConditions = [
  {
    key: 'Bigger Then',
    value: NumberCondition.BiggerThen
  },
  {
    key: 'Is Equal To',
    value: NumberCondition.IsEqualTo
  },
  {
    key: 'Is Not Equal To',
    value: NumberCondition.IsNotEqualTo
  },
  {
    key: 'Less Then',
    value: NumberCondition.LessThen
  }
];

export const stringConditions = [
  {
    key: 'Is Equal To',
    value: StringCondition.IsEqualTo
  },
  {
    key: 'Contains',
    value: StringCondition.Contains
  },
  {
    key: 'Starts With',
    value: StringCondition.StartsWith
  },
  {
    key: 'Ends With',
    value: StringCondition.EndsWith
  },
  {
    key: 'Is Empty',
    value: StringCondition.IsEmpty
  },
  {
    key: 'Is Not Empty',
    value: StringCondition.IsNotEmpty
  }
];

export const dateConditions = [
  {
    key: 'Is Equal To',
    value: DateCondition.IsEqualTo
  },
  {
    key: 'Is After',
    value: DateCondition.IsAfter
  },
  {
    key: 'Is After or Equal To',
    value: DateCondition.IsAfterOrEqualTo
  },
  {
    key: 'Is Before',
    value: DateCondition.IsBefore
  },
  {
    key: 'Is Before or Equal To',
    value: DateCondition.IsBeforeOrEqualTo
  },
  {
    key: 'Is Not Equal To',
    value: DateCondition.IsNotEqualTo

  },
  {
    key: 'Is Empty',
    value: DateCondition.IsEmpty
  },
  {
    key: 'Is Not Empty',
    value: DateCondition.IsNotEmpty
  }
];

export const booleanConditions = [
  {
    key: 'Is Empty',
    value: BooleanCondition.IsEmpty
  },
  {
    key: 'Is Not Empty',
    value: BooleanCondition.IsNotEmpty
  }
];

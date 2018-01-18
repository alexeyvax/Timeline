import { HOURS } from '../constants';

const validation = {
  isEmptyValue: value => value === '',
  isMoreThanMax: value => value > HOURS.max,
  isLessThanMin: value => value < HOURS.min,
  isNotNull: value => value !== null,
  isNotZero: value => value !== 0,
};

export default validation;

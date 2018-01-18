import { WEEKEND } from '../../constants';

export const emptyData = {
  _id: '123456789',
  currentDay: 5,
  dayOfWeek: 'Fri',
  weekend: null,
  month: {
    name: 'Oct',
    number: 9,
  },
  number: 20,
  status: null,
  color: null,
  hours: null,
  year: 2017,
};

export const weekendData = {
  _id: '123456789',
  currentDay: 5,
  dayOfWeek: 'Sun',
  weekend: WEEKEND,
  month: {
    name: 'Oct',
    number: 9,
  },
  number: 22,
  status: null,
  color: null,
  hours: null,
  year: 2017,
};

export const filledData = {
  _id: '123456789',
  currentDay: 5,
  dayOfWeek: 'Mon',
  weekend: null,
  month: {
    name: 'Oct',
    number: 9,
  },
  number: 23,
  status: 'test project name',
  color: '#dedede',
  hours: 8,
  year: 2017,
};

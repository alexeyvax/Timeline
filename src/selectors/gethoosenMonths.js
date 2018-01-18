import { createSelector } from 'reselect';
import { getDays } from '../selectors';
import listOfMonths from '../constants/listOfMonths';

export const getPrevMonthData = createSelector(
  state => state.data.dates,
  (date) => {
    const { currentDay, currentMonth, currentYear } = date;
    const currentNumberMonth = currentMonth.number;
    currentMonth.number -= 1;
    const countDaysOnCurrentMonth = new Date(currentYear, currentNumberMonth, 0).getDate();

    return {
      currentDay,
      currentMonth: {
        name: (currentNumberMonth === 0)
          ? listOfMonths[listOfMonths.length - 1]
          : listOfMonths[currentMonth.number],
        number: (currentNumberMonth === 0) ? 11 : currentMonth.number,
      },
      currentYear: (currentNumberMonth === 0) ? currentYear - 1 : currentYear,
      days: getDays(currentDay, countDaysOnCurrentMonth, currentMonth, currentYear),
    };
  },
);

export const getNextMonthData = createSelector(
  state => state.data.dates,
  (date) => {
    const { currentDay, currentMonth, currentYear } = date;
    const currentNumberMonth = currentMonth.number;
    currentMonth.number += 1;
    const countDaysOnCurrentMonth = new Date(currentYear, currentMonth.number + 1, 0).getDate();
    const lastIndexMonths = listOfMonths.length - 1;

    return {
      currentDay,
      currentMonth: {
        name: (currentNumberMonth === lastIndexMonths)
          ? listOfMonths[0]
          : listOfMonths[currentMonth.number],
        number: (currentNumberMonth === lastIndexMonths) ? 0 : currentMonth.number,
      },
      currentYear: (currentNumberMonth === lastIndexMonths) ? currentYear + 1 : currentYear,
      days: getDays(currentDay, countDaysOnCurrentMonth, currentMonth, currentYear),
    };
  },
);

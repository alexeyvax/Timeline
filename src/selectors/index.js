import { createSelector } from 'reselect';
import listOfMonths from '../constants/listOfMonths';
import { SATURDAY, SUNDAY, WEEKEND } from '../constants';

export const getCurrentDate = state => state.data.dates;
export const getRemoveElement = state => state.confirm.removeElement;
export const getCurrentProject = state => state.data.currentProjectData;
export const isRemove = state => state.data.isRemove;

export const getDays = (currentDay, daysInMonth, currentMonth, currentYear) => {
  const days = [];
  for (let i = 1; i <= daysInMonth; i += 1) {
    const dayOfWeek = new Date(currentYear, currentMonth.number, i).toString().substr(0, 3);
    const day = {
      number: i,
      dayOfWeek,
      status: null,
      color: null,
      hours: null,
      weekend: (dayOfWeek === SATURDAY || dayOfWeek === SUNDAY) ? WEEKEND : null,
      currentDay: (currentDay === i) ? i : null,
      month: {
        name: currentMonth.name,
        number: currentMonth.number,
      },
      year: currentYear,
    };
    days.push(day);
  }
  return days;
};

export const getInitialDate = (projects) => {
  const currentDay = new Date().getDate();
  const getCurrentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const getCountDaysOnCurrentMonth = new Date(currentYear, getCurrentMonth + 1, 0).getDate();
  const listOfStatus = projects.map(item => item.name);
  const currentMonth = {
    name: listOfMonths[getCurrentMonth],
    number: getCurrentMonth,
  };

  return {
    currentDay,
    currentMonth,
    currentYear,
    days: getDays(currentDay, getCountDaysOnCurrentMonth, currentMonth, currentYear),
    listOfStatus,
  };
};

const markSelectedDays = (listOfDays, employee, currentMonth, currentYear) => (
  listOfDays.map((day) => {
    const newDay = day;
    employee.data.map((i) => {
      if (i.year === currentYear
        && i.month.name === currentMonth.name
        && i.number === day.number) {
        newDay._id = i._id;
        newDay.status = i.status;
        newDay.color = i.color;
        newDay.hours = i.hours;
      }
      return i;
    });
    return newDay;
  })
);

export const getEmployeesDays = (employees, data) => employees.map((item) => {
  const {
    currentDay, currentMonth, currentYear, days,
  } = data;
  const listOfDays = getDays(currentDay, days.length, currentMonth, currentYear);
  const newItem = item;

  if (!newItem.data.length) {
    newItem.days = listOfDays;
    return newItem;
  }

  const newDays = markSelectedDays(listOfDays, newItem, currentMonth, currentYear);
  if (newItem.days) {
    newItem.days.length = 0;
    newItem.days.push(...newDays);
  } else {
    newItem.days = [...newDays];
  }
  return newItem;
});

export const getOneEmployeeDays = (employee, data) => {
  const {
    currentDay, currentMonth, currentYear, days,
  } = data;
  const listOfDays = getDays(currentDay, days.length, currentMonth, currentYear);

  return employee.data.length
    ? markSelectedDays(listOfDays, employee, currentMonth, currentYear)
    : listOfDays;
};

export const getEmployeesDaysSelector = employees => createSelector(
  state => state.dates,
  date => getEmployeesDays(employees, date),
);

export const getCurrentEmployees = createSelector(
  state => state.data.employees,
  getCurrentDate,
  (employees, date) => getEmployeesDays(employees, date),
);

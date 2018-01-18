import listOfMonths from '../../constants/listOfMonths';
import { SATURDAY, SUNDAY, WEEKEND } from '../../constants';

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentYear = new Date().getFullYear();
const currentMonth = {
  name: listOfMonths[new Date().getMonth() + 1],
  number: new Date().getMonth() + 1,
};
const currentDay = new Date().getDate();

const getDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i += 1) {
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

export const dates = {
  currentDay,
  currentMonth,
  currentYear,
  days: getDays(),
  listOfStatus: [],
};

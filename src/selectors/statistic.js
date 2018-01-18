import { createSelector } from 'reselect';

const getCoordinatesForPercent = (percent) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

const getData = (projects) => {
  const data = {};
  projects.map((i) => {
    data[i.name] = {
      count: 0,
      hours: 0,
      percent: 0,
      color: i.color,
    };
    return i;
  });
  return data;
};

const cumulative = (item, count) => item + count;

const calculateDay = (item, date, mainData, oneDayToPercent) => {
  const currentItem = mainData.data[item.status];
  currentItem.count = cumulative(currentItem.count, 1);
  currentItem.hours = cumulative(currentItem.hours, item.hours);
  currentItem.percent = cumulative(currentItem.percent, oneDayToPercent);
  return item;
};

const getСalculationFilledDays = (mainData, employee, date, oneDayToPercent) => {
  const newMainData = mainData;
  let totalDays = 0;
  employee.data.map((item) => {
    if (item.year === date.currentYear
      && item.month.name === date.currentMonth.name) {
      totalDays = cumulative(totalDays, 1);
      return calculateDay(item, date, newMainData, oneDayToPercent);
    }
    return undefined;
  });
  newMainData.otherDays = {
    count: date.days.length - totalDays,
    percent: (date.days.length - totalDays) * oneDayToPercent,
  };
  return newMainData;
};

const getPath = (item, startX, startY, endX, endY) => {
  const newItem = item;
  const largeArcFlag = newItem.percent > 0.5 ? 1 : 0;
  newItem.pathData = [
    `M ${startX} ${startY}`,
    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    'L 0 0',
  ].join(' ');
  return newItem;
};

const getCirculeGraph = (mainData) => {
  let totalPercent = 0;
  Object.values(mainData.data).map((item) => {
    const [startX, startY] = getCoordinatesForPercent(totalPercent);
    totalPercent = cumulative(totalPercent, item.percent);
    const [endX, endY] = getCoordinatesForPercent(totalPercent);
    return getPath(item, startX, startY, endX, endY);
  });
  return mainData;
};

const getInfoStatistic = createSelector(
  state => state.data.projects,
  state => state.data.employees,
  state => state.data.dates,
  (projects, employees, date) => {
    const statistic = [];
    const oneDayToPercent = (Math.floor(((1 * 100) / date.days.length) * 10000) / 10000) / 100;
    employees.map((employee) => {
      let mainData = {
        name: employee.name,
        id: employee._id,
        data: getData(projects),
      };
      mainData = getСalculationFilledDays(mainData, employee, date, oneDayToPercent);
      mainData = getCirculeGraph(mainData);
      statistic.push(mainData);
      return employee;
    });
    return statistic;
  },
);

export default getInfoStatistic;

import { createSelector } from 'reselect';
import { assoc } from 'lodash/fp';
import { getOneEmployeeDays } from './index';

export const setData = payload => createSelector(
  state => state.employees,
  state => state.dates,
  (employees, dates) => (
    employees.map((item) => {
      if (item._id !== payload.res._id) {
        return item;
      }
      const newItem = assoc('data', payload.res.data, item);
      return assoc('days', getOneEmployeeDays(newItem, dates), newItem);
    })
  ),
);

export const saveEmployee = data => createSelector(
  state => state.employees,
  employees => (
    employees.map((item) => {
      if (item._id !== data.res._id) {
        return item;
      }
      return assoc('name', data.res.name, item);
    })
  ),
);

export const saveProject = data => createSelector(
  state => state.projects,
  projects => (
    projects.map((item) => {
      if (item._id !== data.res._id) {
        return item;
      }
      return {
        ...item,
        ...data.res,
      };
    })
  ),
);

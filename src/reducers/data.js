import { assoc, compose } from 'lodash/fp';
import { setData, saveEmployee, saveProject } from '../selectors/data';
import { getInitialDate, getEmployeesDays, getEmployeesDaysSelector } from '../selectors';
import * as act from '../actions';

const initialState = {
  loaded: false,
  dates: {
    currentDay: null,
    currentMonth: null,
    currentYear: null,
    days: [],
    listOfStatus: [],
  },
  currentProjectData: null,
  employees: [],
  projects: [],
  isRemove: false,
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case act.SET_INITIAL_DATA: {
      const { employees, projects } = action.payload;
      const dates = getInitialDate(projects);
      const currentEmployees = getEmployeesDays(employees, dates);
      return (dates && currentEmployees)
        ? (
          compose(
            assoc('dates', dates),
            assoc('employees', currentEmployees),
            assoc('projects', projects),
            assoc('loaded', true),
          )(state)
        )
        : state;
    }

    case act.SET_DATA: {
      const { newEmployees, newProjects } = action.payload;
      const employees = (newEmployees)
        ? getEmployeesDaysSelector(newEmployees)(state)
        : state.employees;
      return compose(
        assoc('employees', employees),
        assoc('projects', newProjects || state.projects),
      )(state);
    }

    case act.SAVE_EMPLOYEE_SUCCESS:
      return assoc('employees', saveEmployee(action.payload)(state), state);

    case act.SAVE_PROJECT_SUCCESS:
      return assoc('projects', saveProject(action.payload)(state), state);

    case act.SET_STATUS:
    case act.REMOVE_STATUS:
    case act.UPDATE_HOURS:
      return assoc('employees', setData(action.payload)(state), state);

    case act.SET_DATA_WHEN_CHANGE_MONTHS:
      return assoc('employees', action.payload.newEmployees, state);

    case act.SET_DATE:
      return assoc('dates', action.payload.newDate, state);

    case act.SET_CURRENT_PROJECT:
      return compose(
        assoc('currentProjectData', action.payload.data),
        assoc('isRemove', initialState.isRemove),
      )(state);

    case act.UPDATE_CURRENT_PROJECT:
      return assoc('currentProjectData.name', action.payload.name, state);

    case act.CLEAR_DAY:
      return compose(
        assoc('currentProjectData', initialState.currentProjectData),
        assoc('isRemove', !state.isRemove),
      )(state);

    case act.RESET_CURRENT_PROJECT:
      return assoc('currentProjectData', initialState.currentProjectData, state);

    default:
      return state;
  }
}

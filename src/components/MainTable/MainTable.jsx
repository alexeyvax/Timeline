import React from 'react';
import propTypes from 'prop-types';
import Dates from '../Dates/Dates.jsx';
import CurrentProject from '../CurrentProject/CurrentProject.jsx';
import List from '../../containers/List';
import Desk from '../Desk/Desk.jsx';
import { EMPLOYEE } from '../../constants';
import './theme.css';

const MainTable = ({
  dates,
  employees,
  isRemove,
  currentProjectData,
  onChooseStatus,
  onSaveHours,
  onResetCurrentProject,
  onClearDay,
}) => (
  <div className={'main-table'}>
    <div className={'frozen-container'}>
      <CurrentProject
        data={currentProjectData}
        isRemove={isRemove}
        onReset={onResetCurrentProject}
        onClearDay={onClearDay}
      />
      <List data={employees} type={EMPLOYEE} />
    </div>
    <div className={'scroll-container'}>
      <Dates dates={dates} />
      <Desk
        employees={employees}
        isRemove={isRemove}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    </div>
  </div>
);

MainTable.propTypes = {
  dates: propTypes.shape({
    currentDay: propTypes.number,
    currentMonth: propTypes.shape({
      name: propTypes.string,
      number: propTypes.number,
    }),
    currentYear: propTypes.number,
    days: propTypes.arrayOf(propTypes.object),
    listOfStatus: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  employees: propTypes.arrayOf(propTypes.object).isRequired,
  isRemove: propTypes.bool.isRequired,
  currentProjectData: propTypes.object,
  onChooseStatus: propTypes.func.isRequired,
  onSaveHours: propTypes.func.isRequired,
  onResetCurrentProject: propTypes.func.isRequired,
  onClearDay: propTypes.func.isRequired,
};

export default MainTable;

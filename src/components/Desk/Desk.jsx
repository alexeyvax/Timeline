import React from 'react';
import propTypes from 'prop-types';
import GroupCell from '../GroupCell/GroupCell.jsx';
import './theme.css';

const Desk = ({
  employees, isRemove, onChooseStatus, onSaveHours,
}) => (
  <ul className={'desk'}>
    {employees.map(item => (
      <GroupCell
        key={item._id}
        id={item._id}
        days={item.days}
        isRemove={isRemove}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ))}
  </ul>
);

Desk.propTypes = {
  employees: propTypes.arrayOf(propTypes.object).isRequired,
  isRemove: propTypes.bool.isRequired,
  onChooseStatus: propTypes.func.isRequired,
  onSaveHours: propTypes.func.isRequired,
};

export default Desk;

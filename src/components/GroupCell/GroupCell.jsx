import React from 'react';
import propTypes from 'prop-types';
import Cell from './Cell/Cell.jsx';
import './theme.css';

const GroupCell = ({
  id, days, isRemove, onChooseStatus, onSaveHours,
}) => (
  <ul className={'group-cell'}>
    {days.map(item =>
      <Cell
        key={item.number}
        id={id}
        data={item}
        isRemove={isRemove}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />)}
  </ul>
);

GroupCell.propTypes = {
  id: propTypes.string.isRequired,
  days: propTypes.arrayOf(propTypes.object).isRequired,
  isRemove: propTypes.bool.isRequired,
  onChooseStatus: propTypes.func.isRequired,
  onSaveHours: propTypes.func.isRequired,
};

export default GroupCell;

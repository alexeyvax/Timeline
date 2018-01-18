import React from 'react';
import propTypes from 'prop-types';
import './theme.css';

const Controls = ({ dates, toPrevMonth, toNextMonth }) => (
  <div className={'controls'}>
    <button className={'prev'} onClick={toPrevMonth}>prev month</button>
    <span className={'current-month'}>{`${dates.currentMonth.name} ${dates.currentYear}`}</span>
    <button className={'next'} onClick={toNextMonth}>next month</button>
  </div>
);

Controls.propTypes = {
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
  toPrevMonth: propTypes.func.isRequired,
  toNextMonth: propTypes.func.isRequired,
};

export default Controls;

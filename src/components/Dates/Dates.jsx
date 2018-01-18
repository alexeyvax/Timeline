import React from 'react';
import propTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Controls from '../../containers/Controls';
import './theme.css';

const Dates = ({ dates }) => (
  <div className={'dates-container'}>
    <Controls dates={dates} />
    <ul className={'dates'}>
      {dates.days.map(item =>
        <li key={item.number} className={item.currentDay ? 'current' : null}>
          <span className={'day'}>{item.dayOfWeek}</span>
          <span className={'number'}>{item.number}</span>
        </li>)
      }
    </ul>
  </div>
);

Dates.propTypes = {
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
};

export default onlyUpdateForKeys(['dates'])(Dates);

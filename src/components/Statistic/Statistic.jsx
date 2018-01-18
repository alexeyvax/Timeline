import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PieChart from '../PieChart/PieChart.jsx';
import { PADDING_TOP_STATISTIC_BUTTON } from '../../constants';
import './theme.css';

const Statistic = ({
  isVisibleStatistic, statistic, onShowStatistic, onHideStatistic,
}) => {
  const calcPosition = (e) => {
    onShowStatistic(e.target.getBoundingClientRect().top - PADDING_TOP_STATISTIC_BUTTON);
  };
  return (
    <div className={'statistic'}>
      <button
        type='button'
        className={'open'}
        disabled={isVisibleStatistic}
        onClick={e => calcPosition(e)}
      >
        Show statistic
      </button>
      <button
        type='button'
        className={'close'}
        disabled={!isVisibleStatistic}
        onClick={onHideStatistic}
      >
        Hide statistic
      </button>
      {isVisibleStatistic
        && <ul className={cx('container', isVisibleStatistic ? 'show' : null)}>
        {statistic.map(item => (
          <li key={item.id}>
            <span className={'employee-name'}>
              <strong>name: </strong>
              {item.name}
            </span>
            <div className={'item-statistic-container'}>
              <span className={'count'}>
                <strong>count days and hours in current month</strong>
              </span>
              {Object.keys(item.data).map(i => (
                (item.data[i].count >= 1)
                  ? (<span className={'time'} key={item.data[i].color}>
                      <span className={'name'}>{i}</span>
                      <span className={'value'}>
                        {`${item.data[i].count}d — ${item.data[i].hours}h`}
                      </span>
                    </span>)
                  : null
              ))}
              <span className={'other-days'}>
                <span className={'name'}>other days</span>
                <span className={'value'}>
                  {item.otherDays.count}
                </span>
              </span>
            </div>
            <PieChart mainData={item} />
          </li>
        ))}
      </ul>}
    </div>
  );
};

Statistic.defaultProps = {
  statistic: [],
};

Statistic.propTypes = {
  isVisibleStatistic: PropTypes.bool.isRequired,
  statistic: PropTypes.arrayOf(PropTypes.object),
  onShowStatistic: PropTypes.func.isRequired,
  onHideStatistic: PropTypes.func.isRequired,
};

export default Statistic;

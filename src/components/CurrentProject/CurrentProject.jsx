import React from 'react';
import propTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import cx from 'classnames';
import validation from '../../utils/validation';
import './theme.css';

const renderColor = (data, isRemove, onReset) => {
  switch (true) {
    case validation.isNotNull(data):
      return (
        <div>
          <div className={'container'}>
            <span className={'color'} style={{ backgroundColor: data.color }}></span>
            <span className={'description'}>{data.name}</span>
          </div>
          <button type="button" className={'resetButton'} onClick={onReset}>
            reset current project
          </button>
        </div>
      );
    case isRemove:
      return <div className={'remove'}>{'delete mode is activated'}</div>;
    default:
      return <div className={'empty'}>{"project isn't selected"}</div>;
  }
};

const CurrentProject = ({
  data, isRemove, onReset, onClearDay,
}) => (
  <div className={'current-project'}>
    {renderColor(data, isRemove, onReset)}
    <div className={cx('clear-day', isRemove ? 'removeButton' : null)}>
      <button type='button' onClick={onClearDay}>
        Clear day
      </button>
    </div>
  </div>
);

CurrentProject.propTypes = {
  data: propTypes.shape({
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
  }),
  isRemove: propTypes.bool.isRequired,
  onReset: propTypes.func.isRequired,
  onClearDay: propTypes.func.isRequired,
};

export default onlyUpdateForKeys(['data', 'isRemove'])(CurrentProject);

import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import Hint from '../../Hint/Hint.jsx';
import './theme.css';

const Project = ({
  type, data, isEdit, value, warning, handleChange, onSetCurrentProject,
}) => (
  <span
    className={'project-container'}
    onClick={!isEdit ? () => onSetCurrentProject(data) : null}
  >
    <span className={'color'} style={{ backgroundColor: data.color }}></span>
    <span className={cx('description', `${type}-name`)}>
      {warning && <Hint />}
      {!isEdit ? data.name : <input value={value} onChange={handleChange} />}
    </span>
  </span>
);

Project.propTypes = {
  type: propTypes.string.isRequired,
  data: propTypes.shape({
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
  }),
  isEdit: propTypes.bool.isRequired,
  value: propTypes.string.isRequired,
  warning: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  onSetCurrentProject: propTypes.func.isRequired,
};

export default Project;

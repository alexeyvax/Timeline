import React from 'react';
import propTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import Hint from '../../Hint/Hint.jsx';
import './theme.css';

const Employee = ({
  type, data, isEdit, value, warning, handleChange,
}) => (
  <span className={`${type}-name`}>
    {warning && <Hint />}
    {!isEdit ? data.name : <input value={value} onChange={handleChange} />}
  </span>
);

Employee.propTypes = {
  type: propTypes.string.isRequired,
  data: propTypes.shape({
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
  }).isRequired,
  isEdit: propTypes.bool.isRequired,
  value: propTypes.string.isRequired,
  warning: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
};

const checkPropsChange = (props, nextProps) =>
  (nextProps.isEdit !== props.isEdit ||
  nextProps.data.name !== props.data.name ||
  nextProps.value !== props.value ||
  nextProps.warning !== props.warning);

export default shouldUpdate(checkPropsChange)(Employee);

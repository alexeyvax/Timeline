import React from 'react';
import propTypes from 'prop-types';
import './theme.css';

const Hint = ({ className, content }) => (
  <span className={className || 'warning'}>
    {content || "This field can't be empty!"}
  </span>
);

Hint.propTypes = {
  className: propTypes.string,
  content: propTypes.string,
};

export default Hint;

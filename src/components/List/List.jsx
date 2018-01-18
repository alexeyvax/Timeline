import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import Item from './Item/Item.jsx';
import './theme.css';

const List = ({
  data, type, save, remove, onSetCurrentProject,
}) => (
  <ul className={cx(type)}>
    {data.map(item => (
      <Item
        key={item._id}
        type={type}
        data={item}
        save={save}
        remove={remove}
        onSetCurrentProject={onSetCurrentProject}
      />
    ))}
  </ul>
);

List.propTypes = {
  data: propTypes.arrayOf(propTypes.object).isRequired,
  type: propTypes.string,
  save: propTypes.func.isRequired,
  remove: propTypes.func.isRequired,
  onSetCurrentProject: propTypes.func.isRequired,
};

export default List;

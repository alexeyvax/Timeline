import React from 'react';
import propTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import cx from 'classnames';
import './theme.css';

const Controls = ({
  data, isEdit, edit, save, cancel, remove,
}) => (
  <div className={cx('controls-item', isEdit ? 'editable' : null)}>
    <button type="button" className={'edit'} disabled={isEdit} onClick={edit}>
      Edit
    </button>
    <button type="button" className={'save'} disabled={!isEdit} onClick={() => save(data._id)}>
      Save
    </button>
    <button type="button" className={'cancel'} disabled={!isEdit} onClick={cancel}>
      Cancel
    </button>
    <button type="button" className={'remove'} onClick={() => remove(data._id)}>
      Remove
    </button>
  </div>
);

Controls.propTypes = {
  data: propTypes.shape({
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    isEditEmployee: propTypes.bool,
    data: propTypes.array,
    days: propTypes.arrayOf(propTypes.object),
    controls: propTypes.objectOf(propTypes.bool),
  }).isRequired,
  isEdit: propTypes.bool.isRequired,
  edit: propTypes.func.isRequired,
  save: propTypes.func.isRequired,
  cancel: propTypes.func.isRequired,
  remove: propTypes.func.isRequired,
};

export default onlyUpdateForKeys(['isEdit'])(Controls);

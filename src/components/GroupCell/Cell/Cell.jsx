import React, { Component } from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import { DEFAULT_COUNT_HOURS, KEYCODE, HOURS } from '../../../constants';
import validation from '../../../utils/validation';
import './theme.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: DEFAULT_COUNT_HOURS,
      warning: false,
      isEdit: false,
    };
    this.editHours = this.editHours.bind(this);
    this.saveHours = this.saveHours.bind(this);
    this.cancel = this.cancel.bind(this);
    this.chooseStatus = this.chooseStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data.status !== this.props.data.status ||
      nextProps.data.hours !== this.props.data.hours ||
      nextProps.data.weekend !== this.props.data.weekend ||
      nextProps.isRemove !== this.props.isRemove ||
      nextState.isEdit !== this.state.isEdit ||
      nextState.value !== this.state.value ||
      nextState.warning !== this.state.warning;
  }

  editHours() {
    this.setState({ isEdit: true, value: this.props.data.hours });
  }
  saveHours(e) {
    const value = Number(this.state.value);
    switch (true) {
      case (
        !validation.isEmptyValue(value)
        && !validation.isMoreThanMax(value)
        && !validation.isLessThanMin(value)
      ) && e.keyCode === KEYCODE.enter:
        this.props.onSaveHours(value, this.props.id, this.props.data._id);
        this.setState({ isEdit: false });
        break;
      case e.keyCode === KEYCODE.esc:
        this.cancel(e);
        break;
      default: this.setState({ warning: true });
    }
  }
  cancel(e) {
    if (document.activeElement !== e.target || e.keyCode === KEYCODE.esc) {
      this.setState({ isEdit: false });
    }
  }
  chooseStatus() {
    this.props.onChooseStatus(this.props.data, this.props.id, this.props.data._id);
  }
  handleChange(e) {
    this.setState({ value: e.target.value, warning: false });
  }

  render() {
    const { data, isRemove } = this.props;
    return (
      <li
        className={cx('cell', data.weekend, (data.color && isRemove) ? 'remove' : null)}
        style={{ backgroundColor: data.color }}
      >
        {this.state.isEdit
          ? <input
            type="number"
            min={HOURS.min} max={HOURS.max}
            value={this.state.value}
            autoFocus
            onKeyDown={this.saveHours}
            onBlur={this.cancel}
            onChange={this.handleChange}
          />
          : <button
            onClick={this.chooseStatus}
            onDoubleClick={!isRemove ? this.editHours : null}
          >
            {data.hours || null}
          </button>}
        {data.status && <span className={'hint'}>{data.status}</span>}
      </li>
    );
  }
}

Cell.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.shape({
    _id: propTypes.string,
    currentDay: propTypes.number,
    dayOfWeek: propTypes.string,
    weekend: propTypes.string,
    month: propTypes.shape({
      name: propTypes.string.isRequired,
      number: propTypes.number.isRequired,
    }),
    number: propTypes.number.isRequired,
    status: propTypes.string,
    color: propTypes.string,
    hours: propTypes.number,
    year: propTypes.number.isRequired,
  }).isRequired,
  isRemove: propTypes.bool.isRequired,
  onChooseStatus: propTypes.func.isRequired,
  onSaveHours: propTypes.func.isRequired,
};

export default Cell;

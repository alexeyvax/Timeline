import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Hint from '../Hint/Hint.jsx';
import validation from '../../utils/validation';
import { PROJECT } from '../../constants';
import './theme.css';

class AddNew extends PureComponent {
  static propTypes = {
    type: propTypes.string,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    placeholder: propTypes.string.isRequired,
    buttonContent: propTypes.string.isRequired,
    onAddNew: propTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      color: undefined,
      warning: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.add = this.add.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value, warning: false });
  }
  handleChangeColor(e) {
    this.setState({ color: e.target.value });
  }
  add(e) {
    e.preventDefault();
    if (!validation.isEmptyValue(this.state.value)) {
      this.props.onAddNew(this.props.type, this.state.value.trim(), this.state.color);
      this.setState({ value: '', color: undefined });
    } else {
      this.setState({ warning: true });
    }
  }

  render() {
    const {
      id, label, placeholder, buttonContent,
    } = this.props;
    return (
      <form className={'add-new'} onSubmit={this.add}>
        <label htmlFor={id}>{label}</label>
        {this.state.warning && <Hint />}
        <input
          type='text'
          id={id}
          placeholder={(!this.state.warning) ? placeholder : null}
          value={this.state.value}
          onChange={this.handleChange}
        />
        {(this.props.type === PROJECT) &&
          <input
            type='color'
            className={'color'}
            onChange={this.handleChangeColor} />}
        <button className={'send'}>{buttonContent}</button>
      </form>
    );
  }
}

export default AddNew;

import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import Controls from '../Controls/Controls.jsx';
import Employee from './Employee.jsx';
import Project from './Project.jsx';
import validation from '../../../utils/validation';
import { EMPLOYEE, PROJECT } from '../../../constants';
import './theme.css';

class Item extends PureComponent {
  static propTypes = {
    data: propTypes.object.isRequired,
    type: propTypes.string.isRequired,
    save: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    onSetCurrentProject: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.data.name,
      warning: false,
      isEdit: false,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  edit() {
    this.setState({ isEdit: true });
  }
  save(id) {
    if (!validation.isEmptyValue(this.state.value)) {
      this.props.save(this.props.type, this.state.value.trim(), id);
      this.setState({ isEdit: false });
    } else {
      this.setState({ warning: true });
    }
  }
  cancel() {
    this.setState({ value: this.props.data.name, warning: false, isEdit: false });
  }
  remove(id) {
    this.props.remove(this.props.type, id);
  }
  handleChange(e) {
    this.setState({ value: e.target.value, warning: false });
  }

  render() {
    const { type, data, onSetCurrentProject } = this.props;
    return (
      <li className={`${type}-item`}>
        <Controls
          data={data}
          isEdit={this.state.isEdit}
          edit={this.edit}
          save={this.save}
          cancel={this.cancel}
          remove={this.remove}
        />
        {(this.props.type === EMPLOYEE) &&
          <Employee
            type={this.props.type}
            data={data}
            isEdit={this.state.isEdit}
            value={this.state.value}
            warning={this.state.warning}
            handleChange={this.handleChange} />}
        {(this.props.type === PROJECT) &&
          <Project
            type={this.props.type}
            data={data}
            isEdit={this.state.isEdit}
            value={this.state.value}
            warning={this.state.warning}
            handleChange={this.handleChange}
            onSetCurrentProject={onSetCurrentProject} />}
      </li>
    );
  }
}

export default Item;

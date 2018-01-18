import React from 'react';
import PropTypes from 'prop-types';
import './theme.css';

class Confirm extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onCancel);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onCancel);
  }

  render() {
    return (
      <div className={'confirm-container'}>
        <div className={'confirm'}>
          <span>Are you sure?</span>
          <div>
            <button type='button' className={'remove'} onClick={this.props.onRemove}>Remove</button>
            <button type='button' className={'cancel'} onClick={this.props.onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirm;

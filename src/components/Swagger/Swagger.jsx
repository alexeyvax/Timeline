import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwaggerUi, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import './theme.css';

class SwaggerUI extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: `#${this.props.domID}`,
      url: this.props.url,
      presets: [presets.apis],
    });
  }

  render() {
    return (
      <div
        id={this.props.domID}
        className={'swagger-ui-container'}
      />
    );
  }
}

SwaggerUI.propTypes = {
  url: PropTypes.string,
  domID: PropTypes.string,
};

SwaggerUI.defaultProps = {
  url: 'http://localhost:3000/swagger.json',
  domID: 'swagger-ui-id',
};

export default SwaggerUI;

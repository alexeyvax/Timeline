import React, { Component } from 'react';
import propTypes from 'prop-types';
import Hint from '../Hint/Hint.jsx';
import './theme.css';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHint: '',
      visibilityHint: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    this.setState({ contentHint: e.target.textContent, visibilityHint: true });
  }
  handleMouseLeave() {
    this.setState({ contentHint: '', visibilityHint: false });
  }

  render() {
    const { mainData } = this.props;
    const roundPercent = item => Math.round(item * 100);
    return (
      <div className={'container-svg'}>
        <svg viewBox="-1 -1 2 2">
          <circle
            r='1' cx='0' cy='0' fill='#f0f0f0'
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {`others: ${roundPercent(mainData.otherDays.percent)}%`}
          </circle>
          {Object.keys(mainData.data).map(item =>
            <path
              key={mainData.data[item].color}
              d={mainData.data[item].pathData}
              fill={mainData.data[item].color}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              {`${item}: ${roundPercent(mainData.data[item].percent)}%`}
            </path>)}
        </svg>
        {this.state.visibilityHint && <Hint className={'hint'} content={this.state.contentHint} />}
      </div>
    );
  }
}

PieChart.propTypes = {
  mainData: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    otherDays: propTypes.shape({
      count: propTypes.number,
      percent: propTypes.number,
    }).isRequired,
    data: propTypes.objectOf(propTypes.shape({
      count: propTypes.number,
      hours: propTypes.number,
      pathData: propTypes.string,
      color: propTypes.string,
      percent: propTypes.number,
    })).isRequired,
  }).isRequired,
};

export default PieChart;

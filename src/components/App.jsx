import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from './Header/Header.jsx';
import MainTable from '../containers/MainTable';
import List from '../containers/List';
import Confirm from '../containers/Confirm';
import Statistic from '../containers/Statistic';
import validation from '../utils/validation';
import { PROJECT } from '../constants';
import './theme.css';

class App extends Component {
  static propTypes = {
    loaded: propTypes.bool.isRequired,
    projects: propTypes.array.isRequired,
    employeesLength: propTypes.number.isRequired,
    isConfirmOpened: propTypes.bool.isRequired,
    onInitLoadData: propTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.onInitLoadData();
  }

  render() {
    const {
      loaded, projects, employeesLength, isConfirmOpened,
    } = this.props;
    if (loaded) {
      return (
        <div className={'timeline'}>
          <Header />
          <MainTable />
          <List data={projects} type={PROJECT} />
          {(validation.isNotZero(employeesLength) && validation.isNotZero(projects.length))
            && <Statistic />}
          {isConfirmOpened && <Confirm />}
        </div>
      );
    }
    return (
      <div className={'loader-container'}>
        <span className={'title-loader'}>Application is loading...</span>
        <div className={'loader'}></div>
      </div>
    );
  }
}

export default App;

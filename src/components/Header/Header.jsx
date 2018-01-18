import React from 'react';
import AuthButton from '../../containers/AuthButton';
import AddNew from '../../containers/AddNew';
import { EMPLOYEE, PROJECT } from '../../constants';
import './theme.css';

const Title = () => (
  <header className={'header'}>
    <h1>Timeline</h1>
    <input type="checkbox" id={'inputAddNew'} />
    <label htmlFor={'inputAddNew'} className={'label-add-new'}>
      add new
    </label>
    <div className={'add-new-container'}>
      <AddNew
        type={EMPLOYEE}
        id={'employeeName'}
        label={"Enter new employee's name please"}
        placeholder={'employee name'}
        buttonContent={'add new employee to list'}
      />
      <AddNew
        type={PROJECT}
        id={'projectName'}
        label={"Enter new project's name please"}
        placeholder={'project name'}
        buttonContent={'add new project to list'}
      />
    </div>
    <AuthButton />
  </header>
);

export default Title;

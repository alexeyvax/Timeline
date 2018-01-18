import React from 'react';
import { mount } from 'enzyme';
import AddNew from './AddNew.jsx';
import { EMPLOYEE } from '../../constants';

describe('renders correctly AddNew', () => {
  const labelContent = "Enter new employee's name please";
  const placeholderContent = 'employee name';
  const buttonContent = 'add new employee to list';
  const onAddNew = jest.fn();
  const output = mount((
    <AddNew
      type={EMPLOYEE}
      id={'employeeName'}
      label={labelContent}
      placeholder={placeholderContent}
      buttonContent={buttonContent}
      onAddNew={onAddNew}
    />
  ));

  describe('form element .add-new', () => {
    const form = output.find('.add-new');

    it('renders correctly form element .add-new', () => {
      expect(form.length).toBe(1);
    });

    it('simulate submit form with empty value', () => {
      form.simulate('submit');
      const { warning } = output.state();
      expect(warning).toBe(true);
    });

    it('simulate submit form with filled value', () => {
      const newValue = 'My new value';
      const input = output.find('[type="text"]');

      input.simulate('change', {
        target: { value: newValue },
      });
      form.simulate('submit');

      const { value, warning } = output.state();
      expect(value).toBe('');
      expect(warning).toBe(false);
      expect(onAddNew).toBeCalledWith(EMPLOYEE, newValue, undefined);
    });
  });

  it('renders correctly element label', () => {
    const label = output.find('label');
    expect(label.length).toBe(1);
    expect(label.text()).toBe(labelContent);
  });

  describe('check input', () => {
    const input = output.find('[type="text"]');
    it('element input is exist', () => {
      expect(input.length).toBe(1);
    });

    it('renders correctly input placeholder', () => {
      expect(input.props().placeholder).toBe(placeholderContent);
    });
  });

  it('simulate onchange value', () => {
    const newValue = 'My new value';
    const input = output.find('[type="text"]');

    input.simulate('change', {
      target: { value: newValue },
    });
    const { value, warning } = output.state();
    expect(value).toBe(newValue);
    expect(warning).toBe(false);
  });

  it('renders correctly element send', () => {
    const button = output.find('.send');
    expect(button.length).toBe(1);
    expect(button.text()).toBe(buttonContent);
  });
});

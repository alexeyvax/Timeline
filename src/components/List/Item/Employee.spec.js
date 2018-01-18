import React from 'react';
import { mount } from 'enzyme';
import Employee from './Employee.jsx';
import { EMPLOYEE } from '../../../constants';
import { data, value } from '../../../asset/mocks/List';

describe('Employee component', () => {
  const warning = false;
  const handleChange = jest.fn();

  describe('renders correctly span with isEdit mode disable', () => {
    const isEdit = false;
    const output = mount((
      <Employee
        type={EMPLOYEE}
        data={data}
        isEdit={isEdit}
        value={value}
        warning={warning}
        handleChange={handleChange}
      />
    ));

    it('renders correctly span', () => {
      const span = output.find('span');

      expect(span.length).toBe(1);
      expect(span.hasClass(`${EMPLOYEE}-name`)).toBeTruthy();
      expect(span.text()).toBe(data.name);
    });
  });

  describe('renders correctly span with isEdit mode active', () => {
    const isEdit = true;
    const output = mount((
      <Employee
        type={EMPLOYEE}
        data={data}
        isEdit={isEdit}
        value={value}
        warning={warning}
        handleChange={handleChange}
      />
    ));

    it('renders correctly span', () => {
      const span = output.find('span');

      expect(span.length).toBe(1);
      expect(span.hasClass(`${EMPLOYEE}-name`)).toBeTruthy();
    });

    it('renders correctly input', () => {
      const input = output.find('input');

      expect(input.length).toBe(1);
      expect(input.props().value).toBe(value);
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import Controls from './Controls.jsx';
import { dates } from '../../../asset/mocks/dates';
import listOfMonths from '../../../constants/listOfMonths';

describe('Controls', () => {
  const toPrevMonth = jest.fn();
  const toNextMonth = jest.fn();
  const output = mount((
    <Controls
      dates={dates}
      toPrevMonth={toPrevMonth}
      toNextMonth={toNextMonth}
    />
  ));

  describe('renders correctly Controls - prev and next', () => {
    it('button prev', () => {
      const prev = output.find('.prev');

      expect(prev.text()).toBe('prev month');
      prev.simulate('click');
      expect(toPrevMonth).toHaveBeenCalled();
    });

    it('button next', () => {
      const next = output.find('.next');

      expect(next.text()).toBe('next month');
      next.simulate('click');
      expect(toNextMonth).toHaveBeenCalled();
    });
  });

  it('renders correctly date - month with year', () => {
    const currentMonth = output.find('.current-month');

    expect(currentMonth.text())
      .toBe(`${listOfMonths[new Date().getMonth() + 1]} ${new Date().getFullYear()}`);
  });
});

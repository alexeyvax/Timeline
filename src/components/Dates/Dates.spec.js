import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Dates from './Dates.jsx';
import { dates, daysOfWeek } from '../../asset/mocks/dates';
import store from '../../store/store';

describe('Dates component', () => {
  const output = mount((
    <Provider store={store}>
      <Dates dates={dates}/>
    </Provider>
  ));

  it('renders ul.dates', () => {
    const ulDates = output.find('dates');
    expect(ulDates).toBeTruthy();
  });

  it('renders li', () => {
    const li = output.find('li');
    expect(li.length === dates.days.length).toBeTruthy();
  });

  describe('renders span.day and span.number', () => {
    it('span.day', () => {
      const day = output.find('.day');
      expect(day.length === dates.days.length).toBeTruthy();
    });

    it('span.number', () => {
      const number = output.find('.number');
      expect(number.length === dates.days.length).toBeTruthy();
    });
  });

  it('check length days in range 29(February) till 31', () => {
    const rezult = (dates.days.length < 29 && dates.days.length > 31);
    expect(rezult).toBeFalsy();
  });

  describe('have one of days properties - number, currentDay, dayOfWeek', () => {
    it('number, currentDay, dayOfWeek', () => {
      const haveNumber = dates.days.every(i => ('number' in i));
      expect(haveNumber).toBeTruthy();
    });

    it('currentDay', () => {
      const haveCurrentDay = dates.days.every(i => ('currentDay' in i));
      expect(haveCurrentDay).toBeTruthy();
    });

    it('dayOfWeek', () => {
      const haveDayOfWeek = dates.days.every(i => ('dayOfWeek' in i));
      expect(haveDayOfWeek).toBeTruthy();
    });
  });

  it('number in range 1 till 31', () => {
    const rezult = dates.days.find(i => (i.number < 1 && i.number > 31));
    expect(rezult).toBeUndefined();
  });

  it('currentDay have type number and its uniq in the list', () => {
    const day = dates.days.filter(i => Number.isInteger(i.currentDay));

    expect(day).toHaveLength(1);
    expect(typeof day[0].currentDay === 'number').toBeTruthy();
  });

  it('renders correctly dayOfWeek', () => {
    const rezult = dates.days.find(i => !daysOfWeek.includes(i.dayOfWeek));
    expect(rezult).toBeUndefined();
  });
});

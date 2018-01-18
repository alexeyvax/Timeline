import React from 'react';
import { mount } from 'enzyme';
import PieChart from './PieChart.jsx';
import mainData from '../../asset/mocks/PieChart';

describe('Project component', () => {
  const output = mount((
    <PieChart
      mainData={mainData}
    />
  ));

  it('renders correctly .container-svg', () => {
    const container = output.find('.container-svg');
    expect(container.length).toBe(1);
  });

  it('renders correctly svg', () => {
    const svg = output.find('svg');
    expect(svg.length).toBe(1);
  });

  it('renders correctly circle', () => {
    const textContent = `others: ${Math.round(mainData.otherDays.percent * 100)}%`;
    const circle = output.find('circle');

    expect(circle.length).toBe(1);
    expect(circle.text()).toBe(textContent);
  });

  describe('renders correctly path', () => {
    const path = output.find('path');

    it('render corretly first path', () => {
      expect(path.length).toBe(2);
    });

    it('render corretly first path', () => {
      const firstPathName = Object.keys(mainData.data)[0];
      const textContent = `${firstPathName}: ${Math.round(mainData.data[firstPathName].percent * 100)}%`;
      const firstPath = path.first();

      expect(firstPath.length).toBe(1);
      expect(firstPath.text()).toBe(textContent);
    });
  });

  describe('check change state', () => {
    const path = output.find('path');
    const firstPath = path.first();

    firstPath.simulate('mouseenter');

    it('visibilityHint', () => {
      const { visibilityHint } = output.state();
      expect(visibilityHint).toBe(true);
    });

    it('contentHint', () => {
      const firstPathName = Object.keys(mainData.data)[0];
      const textContent = `${firstPathName}: ${Math.round(mainData.data[firstPathName].percent * 100)}%`;
      const { contentHint } = output.state();

      expect(contentHint).toBe(textContent);
    });
  });
});

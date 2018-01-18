import React from 'react';
import { mount } from 'enzyme';
import Hint from './Hint.jsx';

describe('Header', () => {
  const className = 'test';
  const content = "This field can't be empty!";
  const customContent = 'this test content';

  it('renders correctly span without className', () => {
    const output = mount(<Hint content={customContent} />);
    const span = output.find('span');

    expect(span.length).toBe(1);
    expect(span.hasClass('warning')).toBeTruthy();
    expect(span.text()).toBe(customContent);
  });

  it('renders correctly span without content', () => {
    const output = mount(<Hint className={className} />);
    const span = output.find('span');

    expect(span.length).toBe(1);
    expect(span.hasClass(className)).toBeTruthy();
    expect(span.text()).toBe(content);
  });
});

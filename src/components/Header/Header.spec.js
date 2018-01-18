import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../../asset/mocks/mock-localstorage';
import store from '../../store/store';
import Header from './Header.jsx';

describe('Header', () => {
  const output = mount((
    <Provider store={store}>
      <Router>
        <Header/>
      </Router>
    </Provider>
  ));

  it('renders correctly h1', () => {
    const textContent = 'Timeline';
    const h1 = output.find('h1');

    expect(h1.length).toBe(1);
    expect(h1.text()).toBe(textContent);
  });

  it('renders correctly input', () => {
    const input = output.find('#inputAddNew');
    expect(input.length).toBe(1);
  });

  it('renders correctly label', () => {
    const textContent = 'add new';
    const label = output.find('.label-add-new');

    expect(label.length).toBe(1);
    expect(label.text()).toBe(textContent);
  });
});

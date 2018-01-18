import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from '../store/store';

describe('App', () => {
  const onInitLoadData = jest.fn();

  describe('renders correctly with data => null', () => {
    const textContent = 'Application is loading...';
    const output = mount((
      <Provider store={store}>
        <App
          loaded={false}
          projects={[]}
          employeesLength={0}
          isConfirmOpened={false}
          onInitLoadData={onInitLoadData}
        />
      </Provider>
    ));

    it('renders correctly element .loader', () => {
      const container = output.find('.loader-container');
      expect(container.length).toBe(1);
    });

    it('renders correctly element .title-loader', () => {
      const titleLoader = output.find('.title-loader');

      expect(titleLoader.length).toBe(1);
      expect(titleLoader.text()).toBe(textContent);
    });

    it('renders correctly element .loader', () => {
      const loader = output.find('.loader');
      expect(loader.length).toBe(1);
    });
  });
});

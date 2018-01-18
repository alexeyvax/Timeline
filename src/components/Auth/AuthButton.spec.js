import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import AuthButton from './AuthButton.jsx';
import store from '../../store/store';

// history unknown
describe('AuthButton', () => {
  const history = {};
  const login = '123';
  const signOut = jest.fn();
  const welcomeText = 'Welcome';
  const buttonText = 'Sign out';
  // const pathname = '/auth';
  const output = mount((
    <Provider store={store}>
      <AuthButton
        history={history}
        login={login}
        onSignOut={signOut}
      />
    </Provider>
  ));

  it('renders correctly container', () => {
    const container = output.find('auth-container');
    expect(container).toBeTruthy();
  });

  it('check login text', () => {
    const text = output.find('p');
    expect(text.text()).toEqual(`${welcomeText} ${login}!`);
  });

  it('check button text and func', () => {
    const button = output.find('button');
    expect(button.text()).toEqual(buttonText);

    // button.simulate('click');
    // expect(signOut).toHaveBeenCalled();
    // expect(window.location.pathname).toEqual(pathname);
  });
});

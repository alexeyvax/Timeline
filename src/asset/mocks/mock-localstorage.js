/* disable line because it usage in the tests */
import localStorage from 'mock-local-storage'; // eslint-disable-line

global.window = {};

window.localStorage = global.localStorage;

const login = '1';

sessionStorage.setItem('user', JSON.stringify({ login }));

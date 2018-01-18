import localStorage from 'mock-local-storage';

global.window = {};

window.localStorage = global.localStorage;

const login = '1';

sessionStorage.setItem('user', JSON.stringify({ login }));

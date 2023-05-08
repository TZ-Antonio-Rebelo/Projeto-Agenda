import 'core-js//stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';

const login = new Login('.form-login');
const signUp = new Login('.form-signup');


login.init();
signUp.init();




//import './assets/css/style.css';

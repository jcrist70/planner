import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './style/index.css';
import './style/app.css';
import './style/nav.css';
import './style/planner.css';
import './style/debts.css';
import './style/debtBar.css';
import './style/summary.css';
import './style/login.css';
import './style/account.css';
import './style/accountBar.css';
import App from './App';

import store from './redux/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


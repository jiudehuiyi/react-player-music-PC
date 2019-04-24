import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from 'pages/App';
import store from './reducers'




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();

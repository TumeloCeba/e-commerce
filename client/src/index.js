import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor} from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    
  </Provider>,
  document.getElementById('root')
);
////119 vulnerabilities (101 moderate, 16 high, 2 critical)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import persistor, { store } from './redux/store';

import App from './App';
import Theme from './components/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Theme>
        <HashRouter>
          <CssBaseline />
          <App />
        </HashRouter>
      </Theme>
    </PersistGate>
  </Provider>
);

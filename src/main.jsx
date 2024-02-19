import React from 'react';
import ReactDOM from 'react-dom/client';

import { JournalApp } from './JournalApp';
import './styles.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <JournalApp />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

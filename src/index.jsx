/* Ponto de entrada: Redux + roteador */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <BrowserRouter basename={ import.meta.env.BASE_URL }>
      <App />
    </BrowserRouter>
  </Provider>,
);
/* Fim de index.js */

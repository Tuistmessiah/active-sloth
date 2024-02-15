import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store } from './data/redux/store';

import App from './App';
import { TooltipProvider } from 'src/components/ui/tooltip';

import './index.css';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import ReactDOM from 'react-dom/client';
import React from 'react';
import './global.scss';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado no documento.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

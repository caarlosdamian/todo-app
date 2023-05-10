import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeContextProvider } from './context/themeContext.tsx';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);

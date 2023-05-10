import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { ThemeContextProvider } from './context/themeContext.tsx';
import './main.scss';
import { TodoCotextProvider } from './context/todoContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeContextProvider>
    <TodoCotextProvider>
      <StrictMode>
        
      <App />
      </StrictMode>
    </TodoCotextProvider>
  </ThemeContextProvider>
);

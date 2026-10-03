import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const store = configureStore({
   reducer:rootReducer,
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
       <BrowserRouter>
    <App />
   
     <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "rgba(22,29,41,0.75)",
      backdropFilter: "blur(12px)",
      color: "#fff",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.15)",
      padding: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,.3)",
    },
  }}
/>

    </BrowserRouter>
    </Provider>
   
    
  </React.StrictMode>
);



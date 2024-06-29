import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {SnackbarProvider} from "notistack";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <SnackbarProvider/>
          <App/>
      </BrowserRouter>
  </React.StrictMode>,
)

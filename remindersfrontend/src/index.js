import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { TaskContextProvider } from './context/TaskContext'
import { AuthCONTEXtProvider } from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container } from 'react-bootstrap'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Container>
     <React.StrictMode>
      <AuthCONTEXtProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
        </AuthCONTEXtProvider>
      </React.StrictMode>
  </Container>
);
  
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './index.css'
import App from './App.jsx'
import { JobCategoryProvider } from './admin/context/JobCategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <JobCategoryProvider>
        <App />
      </JobCategoryProvider>
    </BrowserRouter>
  </StrictMode>,
)

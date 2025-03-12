import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from "react-ga4"
import './index.css'
import App from './App.tsx'

ReactGA.initialize("YOUR_GOOGLE_ANALYTICS_ID");

ReactGA.send("pageview");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

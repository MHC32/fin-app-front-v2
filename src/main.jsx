import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { TamaguiProvider } from '@tamagui/core'
import config from '../tamagui.config.ts'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TamaguiProvider config={config} defaultTheme="dark">
        <App />
      </TamaguiProvider>
    </BrowserRouter>
  </StrictMode>,
)

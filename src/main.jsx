import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { TamaguiProvider } from '@tamagui/core'
import config from '../src/config/tamagui.config.ts'
import { store } from './app/store'
import './index.css'
import App from './App.jsx'
import '@tamagui/core/reset.css'
import SessionManager from './components/SessionManager'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <TamaguiProvider config={config} defaultTheme="dark">
      <SessionManager>
          <App />
      </SessionManager>
      </TamaguiProvider>
    </Provider>
  </StrictMode>,
)

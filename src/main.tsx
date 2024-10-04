import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvider } from './context/BudgetContext.tsx'
import { I18nextProvider } from "react-i18next"
import i18next from 'i18next'
import global_es from './translations/es/global.json'
import global_en from './translations/en/global.json'

i18next.init({
  interpolation: { escapeValue: false },
  fallbackLng: 'es',
  lng: localStorage.defaultlanguage,
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <BudgetProvider>
        <App />
      </BudgetProvider>
    </I18nextProvider>
  </StrictMode>,
)

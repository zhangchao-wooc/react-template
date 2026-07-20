import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// const backend = new Backend({})
export const i18nReady = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      debug: import.meta.env.WOOC_ENV === 'development',
      load: 'languageOnly',
      fallbackLng: 'en-US',
      backend: {
        loadPath: import.meta.env.WOOC_I18N_LOADPATH,
        addPath: import.meta.env.WOOC_I18N_ADDPATH,
        allowMultiLoading: true,
        customHeaders: {
          'Cache-Control': 'no-cache',
          Expires: '0'
        }
        // parse: (
        //   data: string,
        //   languages?: string | string[],
        //   namespaces?: string | string[]
        // ) => {
        //   console.log('parse', data)
        // }
      },
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    },
    (err) => {
      if (err) return console.log('something went wrong loading', err)
    }
  )

export default i18n

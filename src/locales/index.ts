import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// const backend = new Backend({})
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      debug: true,
      load: 'languageOnly',
      fallbackLng: 'en',
      backend: {
        loadPath: '/src/locales/{{lng}}/{{ns}}.json',
        addPath: '/src/locales/add/{{lng}}/{{ns}}',
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
    (err, t) => {
      if (err) return console.log('something went wrong loading', err)
      t('key') // -> same as i18next.t
    }
  )

export default i18n

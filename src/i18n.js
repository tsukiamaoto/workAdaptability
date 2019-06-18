import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

function loadLocales (url, options, callback, data) {
  try {
    const locale = require(`${url}.json`)
    callback(locale, { status: '200' })
  } catch (e) {
    callback(null, { status: '404' })
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // fallbackLng: 'zh-TW',
    // have a common namespace used around the full app
    locale: 'zh-TW',
    defaultNS: 'translation',
    keySeparator: false,
    lng: 'zh-TW',
    fallbackLng: ['en-US', 'zh-CN'],
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}',
      parse: (data) => data,
      ajax: loadLocales
    }
  })

export default i18n

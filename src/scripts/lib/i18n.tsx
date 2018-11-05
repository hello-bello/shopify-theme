import * as i18n from 'i18next'
import {reactI18nextModule} from 'react-i18next'
​
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
}
​
i18n
.use(reactI18nextModule)
.init({
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  lng: 'en',
  resources,​
})
​
export default i18n

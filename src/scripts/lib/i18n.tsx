import * as i18n from 'i18next'
import {reactI18nextModule} from 'react-i18next'
​
import en from '../locales/en'
​
i18n
.use(reactI18nextModule)
.init({
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  lng: 'en',
  resources: {en},​
})
​
export default i18n

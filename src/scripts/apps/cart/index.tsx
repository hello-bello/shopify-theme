import * as React from 'react'
import {render} from 'react-dom'

import App from './app'

const el = document.getElementById('cart-app')

if (el) {
  render(<App />, el)
}

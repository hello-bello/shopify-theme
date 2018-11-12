import * as React from 'react'

import renderApp from '../../utils/render-app'
import BundlerApp from './app'
import convertShopifyJSONToProps from './convert-shopify-json-to-props'

const bundlerApp = window.bundlerApp

if (bundlerApp) {
  const props = convertShopifyJSONToProps(bundlerApp)
  renderApp(<BundlerApp {...props} />, 'bundler-app')
}

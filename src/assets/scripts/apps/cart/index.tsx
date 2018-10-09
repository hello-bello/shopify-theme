import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface Props {}

class CartApp extends React.Component<Props> {
  componentDidMount () {
    window.CartApp = {
      addToCart: this.addToCart
    }
  }

  addToCart = (variantId: string): boolean => {
    console.log(`adding variant id ${variantId} to cart`)
    return true
  }

  render () {
    return <div>
      <h2>Cart</h2>
    </div>
  }
}

const el = document.getElementById('cart-app')
if (el) ReactDOM.render(<CartApp />, el)
import * as React from 'react'
import * as ReactDOM from 'react-dom'

class CartApp extends React.Component<{}, Cart> {
  public componentDidMount() {
    window.CartApp = {
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    }
    this.setState(window.cart)
  }

  public render() {
    if (!this.state) { return null }

    return <div>
      <h2>Cart</h2>
      {this.state.items.map(item => <div key={item.id}>
        <span>{item.title}</span>
        <button className='button' onClick={() => this.removeFromCart(item)}>Remove</button>
      </div>)}
    </div>
  }

  private addToCart = async (variantId: string): Promise<boolean> => {
    const body = new FormData()
    body.append('id', variantId)
    body.append('quantity', '1')

    try {
      await fetch('/cart/add.js', {
        body,
        method: 'POST',
      })
      await this.getCart()
      return true
    } catch (e) {
      return false
    }
  }

  private getCart = async () => {
    const res = await fetch('/cart.js')
    const cart = await res.json()
    this.setState(cart)
  }

  private removeFromCart = async (item: Item): Promise<boolean> => {
    const body = new FormData()
    body.append('id', item.id.toString())
    body.append('quantity', '0')

    try {
      await fetch('/cart/change.js', {
        body,
        method: 'POST',
      })
      await this.getCart()
      return true
    } catch (e) {
      return false
    }
  }
}

const el = document.getElementById('cart-app')
if (el) { ReactDOM.render(<CartApp />, el) }

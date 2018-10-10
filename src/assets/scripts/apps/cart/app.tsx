import * as React from 'react'

export default class CartApp extends React.Component<{}, Cart> {
  public componentDidMount() {
    document.body.addEventListener('click', e => {
      if (e.target instanceof Element) {
        const el = e.target as Element
        const addToCartId = el.getAttribute('data-add-to-cart-id')
        if (addToCartId) { this.addToCart(addToCartId) }
      }
    })

    this.setState(window.cart)
  }

  public render() {
    if (!this.state) { return null }

    return <div>
      <div className='grid-x'>
        <div className='cell small-6'>
          <h2 className='h5'>Cart</h2>
        </div>
        <div className='cell small-6 text-right'>
          <a href='#' data-close-drawer='cart-drawer'>Close</a>
        </div>
      </div>
      {this.state.items.map(item => <div key={item.id}>
        <span>{item.quantity} x {item.title}</span>
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
      window.Drawer.open('cart-drawer')
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

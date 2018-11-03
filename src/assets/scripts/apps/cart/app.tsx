import * as React from 'react'

import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'
import withLoadingUI from '../../utils/with-loading-ui'

export default class CartApp extends React.Component<{}, Cart> {
  public componentDidMount() {
    this.setState(window.cart)
    addClickListenerForAttr('data-add-to-cart-id', this.addToCartWithDom)
    addClickListenerForAttr('data-remove-from-cart-id', this.removeFromCartWithDom)
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
      {this.state.items.map((item) => <div key={item.id}>
        <span>{item.quantity} x {item.title}</span>
        <button className='button' data-remove-from-cart-id={item.id}>Remove</button>
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

  private addToCartWithDom = async (variantId: string, target: HTMLElement) => {
    withLoadingUI(target, () => this.addToCart(variantId))
  }

  private getCart = async () => {
    const res = await fetch('/cart.js')
    const cart = await res.json()
    this.setState(cart)
  }

  private removeFromCart = async (variantId: string): Promise<boolean> => {
    const body = new FormData()
    body.append('id', variantId)
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

  private removeFromCartWithDom = async (variantId: string, target: HTMLElement) => {
    withLoadingUI(target, () => this.removeFromCart(variantId))
  }
}

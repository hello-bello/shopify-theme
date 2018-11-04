import * as cart from '@shopify/theme-cart'
import * as React from 'react'

import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'
import withLoadingUI from '../../utils/with-loading-ui'

export default class CartApp extends React.Component<{}, Cart> {
  public componentDidMount() {
    this.setState(() => window.cart)
    addClickListenerForAttr('data-add-to-cart-variant-id', this.addToCartWithDom)
    addClickListenerForAttr('data-remove-from-cart-key', this.removeFromCartWithDom)
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
      {this.state.items.length ? this.state.items.map((item) => <div key={item.id}>
        <span>{item.quantity} x {item.title}</span>
        <button className='button' data-remove-from-cart-key={item.key}>Remove</button>
      </div>) : <div>Your cart is empty!</div>}
    </div>
  }

  private addToCart = async (variantId: number): Promise<boolean> => {
    try {
      await cart.addItem(variantId, {properties: {}, quantity: 1})
      await this.getCart()
      window.Drawer.open('cart-drawer')
      return true
    } catch (e) {
      return false
    }
  }

  private addToCartWithDom = async (variantId: string, target: HTMLElement) => {
    withLoadingUI(target, async () => {
      await this.addToCart(parseInt(variantId, 10))
    })
  }

  private getCart = async () => {
    const contents = await cart.getState()
    this.setState(() => contents)
  }

  private removeFromCart = async (key: string): Promise<boolean> => {
    try {
      await cart.removeItem(key)
      await this.getCart()
      return true
    } catch (e) {
      return false
    }
  }

  private removeFromCartWithDom = async (key: string, target: HTMLElement) => {
    withLoadingUI(target, async () => {
      await this.removeFromCart(key)
    })
  }
}

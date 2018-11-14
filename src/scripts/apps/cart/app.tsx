import * as cart from '@shopify/theme-cart'
import * as React from 'react'
import {withI18n, WithI18n} from 'react-i18next'

import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'
import withLoadingUI from '../../utils/with-loading-ui'
import groupLineItems from './group-line-items'

class CartApp extends React.Component<WithI18n, Cart> {
  constructor(props: WithI18n) {
    super(props)
    this.state = window.cart
  }

  public componentDidMount() {
    addClickListenerForAttr('data-add-to-cart-variant-id', this.addToCartWithDom)
    addClickListenerForAttr('data-remove-from-cart-key', this.removeFromCartWithDom)
    window.cartApp = {add: this.addToCart}
  }

  public render() {
    this.renderExternalDOM()

    const {t} = this.props
    const items = groupLineItems(this.state.items)

    return <div>
      <div className='grid-x'>
        <div className='cell small-6'>
          <h2 className='h5'>{t('cart.general.title')}</h2>
        </div>
        <div className='cell small-6 text-right'>
          <a href='#' data-close-drawer='cart-drawer'>{t('cart.general.close')}</a>
        </div>
      </div>

      {(() => {
        if (!items.length) { return <div>{t('cart.general.empty')}</div> }

        return items.map((item) => {
          if (Array.isArray(item)) {
            const [parentItem, ...childItems] = item
            return <div key={parentItem.id}>
              <div>{parentItem.quantity} x {parentItem.title}</div>
              <div>{childItems.map((child) => `${child.variant_title} x ${child.quantity}`).join(', ')}</div>
              <button className='button' onClick={this.handleRemoveFromCartClick(item)}>{t('cart.general.remove')}</button>
            </div>
          } else {
            return <div key={item.id}>
              <span>{item.quantity} x {item.title}</span>
              <button className='button' onClick={this.handleRemoveFromCartClick([item])}>{t('cart.general.remove')}</button>
            </div>
          }})
      })()}
    </div>
  }

  private addToCart = async (items: Array<[number, {properties?: object, quantity?: number}?]>): Promise<boolean> => {
    try {
      for (const item of items) {
        // shopify requires synchronous adding
        await cart.addItem(...item)
      }
      await this.getCart()
      window.Drawer.open('cart-drawer')
      return true
    } catch (e) {
      return false
    }
  }

  private addToCartWithDom = async (variantId: string, target: HTMLElement) => {
    withLoadingUI(target, async () => {
      await this.addToCart([[parseInt(variantId, 10)]])
    })
  }

  private getCart = async () => {
    const contents = await cart.getState()
    this.setState(() => contents)
  }

  private handleRemoveFromCartClick = (items: Item[]) => () => {
    this.removeFromCart(items.map((item) => item.key))
  }

  private removeFromCart = async (keys: string[]): Promise<boolean> => {
    try {
      for (const key of keys) {
        // shopify requires synchronous removing
        await cart.removeItem(key)
      }
      await this.getCart()
      return true
    } catch (e) {
      return false
    }
  }

  private removeFromCartWithDom = async (key: string, target: HTMLElement) => {
    withLoadingUI(target, async () => {
      await this.removeFromCart([key])
    })
  }

  private renderExternalDOM = () => {
    const numItems = this.state.items.length
    const innerHTML = numItems > 0 ? `${numItems}` : ''
    const display = numItems > 0 ? 'flex' : 'none';

    (document.querySelectorAll('[data-cart-count]') as NodeListOf<HTMLElement>).forEach((el) => {
      el.innerHTML = innerHTML
      el.style.display = display
    })
  }
}

export default withI18n()(CartApp)

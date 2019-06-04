import * as cart from '@shopify/theme-cart'
import * as React from 'react'

const {useEffect, useState} = React

interface Cart {
  items: Array<{
    id: number,
    key: string,
    product_title: string,
    quantity: number,
    title: string,
    variant_title: string,
  }>,
}

export default () => {
  const [state, setState] = useState<Cart | null>(null)

  const openCartDrawer = () => {
    $('#cart-drawer').foundation('open')
  }

  const addItem = async (variantID: number) => {
    await cart.addItem(variantID)
    await getCart()
    openCartDrawer()
  }

  const removeItem = (key: string) => async () => {
    await cart.removeItem(key)
    getCart()
  }

  const listenForAddItemClicks = () => {
    $('[data-add-to-cart]').on('click', (e) => {
      const variantID = e.currentTarget.getAttribute('data-add-to-cart')
      if (variantID) {
        addItem(parseInt(variantID, 10))
      }
    })
  }

  const getCart = async () => {
    setState(await cart.getState())
  }

  useEffect(() => {
    getCart()
    listenForAddItemClicks()
  }, [])

  if (!state) { return null }

  return <div>
    <h2>Cart</h2>
    {state.items.map((item) => <div key={item.id}>
      <span>{item.title} x {item.quantity}</span>
      <span onClick={removeItem(item.key)}>Remove</span>
    </div>)}
  </div>
}

interface Cart {
  items: Item[],
}

interface Item {
  id: number,
  key: string,
  quantity: number,
  title: string,
}

interface Window {
  cart: Cart,
  cartApp: {
    add: (items: Array<[number, {properties?: object, quantity?: number}?]>) => Promise<boolean>,
  }
}

declare module '@shopify/theme-cart'

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
}

declare module '@shopify/theme-cart'

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
    add: (variantId: number) => Promise<any>,
  }
}

declare module '@shopify/theme-cart'

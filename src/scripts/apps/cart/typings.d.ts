interface Cart {
  items: Item[],
}

interface Item {
  id: number,
  key: string,
  properties?: {
    bundle_id?: string,
    parent_bundle_id?: string,
  },
  quantity: number,
  variant_title: string,
  title: string,
}

interface Window {
  cart: Cart,
  cartApp: {
    add: (items: Array<[number, {properties?: object, quantity?: number}?]>) => Promise<boolean>,
  }
}

declare module '@shopify/theme-cart'

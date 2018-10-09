interface Cart {
  items: Item[],
}

interface Item {
  id: number,
  title: string,
}

interface Window {
  cart: Cart,
  CartApp: {
    addToCart: (string) => Promise<boolean>,
    removeFromCart: (Item) => Promise<boolean>,
  }
}
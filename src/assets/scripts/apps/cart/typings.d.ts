interface Cart {
  items: Item[],
}

interface Item {
  id: number,
  quantity: number,
  title: string,
}

interface Window {
  cart: Cart,
}
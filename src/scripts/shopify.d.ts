interface Collection {
  id: number,
  products?: Product[],
}

interface Product {
  id: number,
  tags: string[],
  variants: Variant[],
}

interface Variant {
  id: number,
}
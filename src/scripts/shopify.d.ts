interface Collection {
  id: number,
  products?: Product[],
}

interface Product {
  id: number,
  options: string[],
  tags: string[],
  variants: Variant[],
}

interface Variant {
  id: number,
  option1: string,
  title: string,
}
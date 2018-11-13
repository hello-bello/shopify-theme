import {Props} from './app'

const TAGS = {
  product: 'Bundler App Product',
  variants: 'Bundler App Variants',
}

export default ({allocationLength, collection, products}: {allocationLength: number, collection: Collection, products: Product[]}): Props => {
  return {
    allocationLength,
    mainProduct: products.find((product) => product.tags.includes(TAGS.product)),
    possibleChoices: products
      .filter((product) => product.tags.includes(TAGS.variants))
      .reduce<Variant[]>((arr, product) => arr.concat(product.variants), []),
  }
}

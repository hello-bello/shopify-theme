import {Props} from './app'

const tags = {
  product: 'Bundler App Product',
  variants: 'Bundler App Variants',
}

export default ({collection, products}: {collection: Collection, products: Product[]}): Props => {
  return {
    product: products.find((product) => product.tags.includes(tags.product)),
    variants: products
      .filter((product) => product.tags.includes(tags.variants))
      .reduce<Variant[]>((arr, product) => arr.concat(product.variants), []),
  }
}

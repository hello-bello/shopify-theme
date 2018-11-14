// this method accepts an array of variants that could contain duplicates
// and returns a cart add-formatted array with proper quantities
export default (variants: Variant[], properties: object = {}): Array<[number, {properties: object, quantity: number}]> => {
  const uniqueIds = Array.from(new Set(variants.map((variant) => variant.id)))

  const grouped = uniqueIds.reduce<Array<[number, {properties: object, quantity: number}]>>((arr, id) => {
    const quantity = variants.filter((variant) => variant.id === id).length
    arr.push([id, {properties, quantity}])
    return arr
  }, [])

  return grouped
}

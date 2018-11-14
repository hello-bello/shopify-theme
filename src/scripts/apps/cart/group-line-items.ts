// accepts an array of items, and returns an array of items or array of items for bundles
export default (items: Item[]): Array<Item | Item[]> => {
  const [nonChildBundleItems, childBundleItems] = items.reduce<Item[][]>((arr, item) => {
    if (item.properties && item.properties.parent_bundle_id) {
      arr[1].push(item)
    } else {
      arr[0].push(item)
    }
    return arr
  }, [[], []])

  const groupedItems = nonChildBundleItems.map((item) => {
    const bundleId = item.properties && item.properties.bundle_id
    if (bundleId) {
      return [item].concat(childBundleItems.filter((child) => child.properties && child.properties.parent_bundle_id === bundleId))
    } else {
      return item
    }
  })

  return groupedItems
}

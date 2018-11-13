interface Props {
  incoming: Variant,
  choices: Variant[],
}

// TODO: allow for allocation length from shopify
const ALLOCATION_LENGTH = 7

export default ({incoming, choices}: Props): Variant[] => {
  const incomingIdx = choices.findIndex((variant) => variant.id === incoming.id)

  const uniqChoices = choices
  .filter((variant) => variant.id !== incoming.id)
  .reduce<Variant[]>((arr, choice) => {
    const idx = arr.findIndex((variant) => variant.id === choice.id)
    if (idx === -1) { arr.push(choice) }
    return arr
  }, incomingIdx === -1 ? [incoming] : [])

  if (uniqChoices.length === 0) { return [] }

  const allocation = []

  // we loop in reverse to prefer the earliest picked choices
  for (let i = ALLOCATION_LENGTH; i > 0; --i) {
    allocation.push(uniqChoices[i % uniqChoices.length])
  }

  return allocation
}

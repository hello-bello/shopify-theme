export default async (target: HTMLElement, fn: () => Promise<void> | void) => {
  const oldBackgroundColor = target.style.backgroundColor
  const oldInnerHTML = target.innerHTML

  target.style.backgroundColor = 'red'
  target.innerHTML = 'Loading...'
  target.setAttribute('disabled', 'disabled')

  await fn()

  target.style.backgroundColor = oldBackgroundColor
  target.innerHTML = oldInnerHTML
  target.removeAttribute('disabled')
}

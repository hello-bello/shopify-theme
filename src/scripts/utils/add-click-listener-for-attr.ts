export default (attr: string, fn: (val: string, target: HTMLElement) => void) => {
  document.body.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement

    // we have to look up the DOM to handle cases like <a data-whatever><img></a>
    const aTarget = ['A', 'BUTTON'].includes(target.tagName) ? target : target.closest('a')

    if (!aTarget || !aTarget.hasAttribute(attr)) { return }

    e.preventDefault()
    fn(aTarget.getAttribute(attr) || '', aTarget)
  })
}

export default (attr: string, fn: (val: string, target: HTMLElement) => void) => {
  document.body.addEventListener('click', (e) => {
    if (e.target instanceof HTMLElement) {
      const target = e.target as HTMLElement

      // only <a> tags can have the attribute, and we have to look up the DOM to handle cases like <a data-whatever><img></a>
      const aTarget = target.tagName === 'A' ? target : target.closest('a')

      if (aTarget && aTarget.hasAttribute(attr)) {
        e.preventDefault()
        fn(aTarget.getAttribute(attr) || '', aTarget)
      }
    }
  })
}

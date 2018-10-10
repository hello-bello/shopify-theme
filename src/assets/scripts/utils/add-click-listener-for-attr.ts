export default (attr: string, fn: (val: string, target?: HTMLElement) => any) => {
  document.body.addEventListener('click', e => {
    if (e.target instanceof HTMLElement) {
      const target = e.target as HTMLElement
      if (target.hasAttribute(attr)) {
        e.preventDefault()
        fn(target.getAttribute(attr), target)
      }
    }
  })
}

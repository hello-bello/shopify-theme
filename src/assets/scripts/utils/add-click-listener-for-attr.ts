export default (attr: string, fn: (Element) => any) => {
  document.body.addEventListener('click', e => {
    if (e.target instanceof Element) {
      const target = e.target as Element
      if (target.hasAttribute(attr)) {
        e.preventDefault()
        fn(target.getAttribute(attr))
      }
    }
  })
}

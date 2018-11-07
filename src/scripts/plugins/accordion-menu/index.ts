import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'

addClickListenerForAttr('data-accordion-menu-toggle', (key) => {
  const accordion = document.querySelector(`[data-accordion-menu="${key}"]`) as HTMLElement
  if (!accordion) { return }
  accordion.style.maxHeight = accordion.style.maxHeight ? null : `${accordion.scrollHeight}px`
})

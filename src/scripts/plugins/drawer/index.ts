import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'

const close = (id: string) => {
  const el = document.getElementById(id)
  if (el) { el.classList.remove('open') }
}

const open = (id: string) => {
  const el = document.getElementById(id)
  if (el) { el.classList.add('open') }
}

const toggle = (id: string) => {
  const el = document.getElementById(id)
  if (el) { el.classList.toggle('open') }
}

addClickListenerForAttr('data-close-drawer', close)
addClickListenerForAttr('data-open-drawer', open)
addClickListenerForAttr('data-toggle-drawer', toggle)

window.Drawer = {
  close,
  open,
  toggle,
}

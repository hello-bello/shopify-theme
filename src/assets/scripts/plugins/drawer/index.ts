import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'

const close = id => document.getElementById(id).classList.remove('open')
const open = id => document.getElementById(id).classList.add('open')
const toggle = id => document.getElementById(id).classList.toggle('open')

addClickListenerForAttr('data-close-drawer', close)
addClickListenerForAttr('data-open-drawer', open)
addClickListenerForAttr('data-toggle-drawer', toggle)

window.Drawer = {
  close,
  open,
  toggle,
}

import addClickListenerForAttr from '../../utils/add-click-listener-for-attr'

import {closeTransitionDuration} from '../../../styles/plugins/drawer/variables.scss'

const closingTimeout = parseFloat(closeTransitionDuration.replace('s', '')) * 1000

const close = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.classList.add('closing')
    el.classList.remove('open')
    setTimeout(() => el.classList.remove('closing'), closingTimeout)
  }
}

const open = (id: string) => {
  const el = document.getElementById(id)
  if (el) { el.classList.add('open') }
}

addClickListenerForAttr('data-close-drawer', close)
addClickListenerForAttr('data-open-drawer', open)

window.Drawer = {
  close,
  open,
}

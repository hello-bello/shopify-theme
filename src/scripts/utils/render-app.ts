import {render} from 'react-dom'

export default (app: React.ReactElement<any>, elementId: string) => {
  const el = document.getElementById(elementId)
  if (el) { render(app, el) }
}

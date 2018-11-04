import * as ReactDOM from 'react-dom'

export default (app: React.ReactElement<any>, elementId: string) => {
  const el = document.getElementById(elementId)
  if (el) { ReactDOM.render(app, el) }
}

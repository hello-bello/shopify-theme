import * as React from 'react'
import * as ReactDOM from 'react-dom'

class TestApp extends React.Component<{}> {
  render () {
    return <div>This is a test React app</div>
  }
}

ReactDOM.render(<TestApp />, document.getElementById('test-react-app'))
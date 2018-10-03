import React from 'react'
import ReactDOM from 'react-dom'

class TestApp extends React.Component {
  render () {
    return <div>hey</div>
  }
}

ReactDOM.render(<TestApp />, document.getElementById('test-react-app'))
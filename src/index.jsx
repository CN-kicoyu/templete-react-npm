import React from 'react'

import './style.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  state = {
    value: '333333'
  }

  render() {
    const { value } = this.state
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} className="hha">
          {' '}
          99999
        </div>
        <div style={{ flex: 1 }}>{value}</div>
      </div>
    )
  }
}
export default App

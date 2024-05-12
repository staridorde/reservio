import React from 'react'
import './App.css'

class App extends React.Component {
  handleClick = () => {
    fetch('http://localhost:8001/test-request')
      .then((response: Response) => response.json())
      .then((data: any) => {
        console.log('Response from server:', data)
      })
      .catch((error: Error) => {
        console.error('Error:', error)
      })
  }

  render() {
    return (
      <div>
        <button style={{height: 300, width: 500, fontSize: 50}} onClick={this.handleClick}>Send Request</button>
      </div>
    )
  }
}

export default App

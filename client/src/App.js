import './App.css';

function App() {
  const handleClick = () => {
    fetch('http://localhost:8001/test-request')
      .then(response => response.json())
      .then(response => {
        console.log('Response from server:', response)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="App">
      <button style={{ height: 300, width: 500, fontSize: 50 }} onClick={handleClick}>Send Request</button>
    </div>
  )
}

export default App;

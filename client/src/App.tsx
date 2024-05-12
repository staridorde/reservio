import React from 'react'
import './App.css'

interface TicketType {
  _id: string;
  name: string;
  capacity: string;
  price: string;
}

interface AppState {
  ticketTypes: TicketType[];
  error: string | null;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      ticketTypes: [],
      error: null,
    }
  }

  handleClick = () => {
    fetch('http://localhost:8001/ticketTypes')
      .then((response: Response) => response.json())
      .then((data: TicketType[]) => {
        console.log('Response from server:', data)
        this.setState({ ticketTypes: data, error: null });
      })
      .catch((error: Error) => {
        console.error('Error:', error)
        this.setState({ error: error.message });
      })
  }

  render() {
    const { ticketTypes, error } = this.state;

    return (
      <div>
        <button style={{height: 300, width: 500, fontSize: 50}} onClick={this.handleClick}>Send Request</button>
        {error && <div>Error: {error}</div>}
        <ul style={{height: 1000, width: 1000, fontSize: 100}}>
          {ticketTypes.map(ticketType => (
            <li key={ticketType._id}>{ticketType.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App

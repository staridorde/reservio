import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <nav style={{width: 500, fontSize: 50 }}>
          <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reservation">Reservation</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navbar

import { useState } from 'react'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
          <h1 style={{textAlign:"center"}}>Lista uczniów</h1>
          <table>
          </table>
          <form onSubmit={(event) => event.preventDefault()}>
              <input type="text" placeholder="" style={{margin: '10px'}}/>
              <input type="radio" value="1" style={{margin: '10px'}}/>Obecni
              <input type="radio" value="2" style={{margin: '10px'}}/>Nieobecni
              <button type="submit" style={{margin: '10px'}}>Dodaj nowego ucznia</button>
          </form>
          <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  Marcin Kuźnik
                  <span className="badge text-bg-success rounded-pill">Obecny</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  Martyna Woźniak
                  <span className="badge text-bg-success rounded-pill">Obecna</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  Karol Domagała
                  <span className="badge text-bg-warning rounded-pill">Nieobecny</span>
              </li>
          </ul>

      </div>
    </>
  )
}

export default App

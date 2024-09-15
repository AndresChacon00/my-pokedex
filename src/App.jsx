import { Link, Outlet } from 'react-router-dom'
import './App.css'


function App() {

  return (
    <div className='App'>
      <header>
        <h1>Pokedex</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default App

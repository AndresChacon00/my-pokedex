import { Link, Outlet } from 'react-router-dom'
import './App.css'
import { FaSearch } from 'react-icons/fa'


function App() {

  return (
    <div className='App'>
      <header>
        <h1>Pokedex</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Search <FaSearch /></Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App

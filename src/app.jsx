import React from 'react'
import { BrowserRouter, NavLink, Route, Routes} from 'react-router'
import Login from './login/login.jsx'
import Sort from './sort/sort.jsx'
import About from './about/about.jsx'
import Lists from './lists/lists.jsx'
import Profile from './profile/profile.jsx'
import '../dist/output.css'


export default function App() {
  return (
    <>
    <BrowserRouter>
    <header id='headbar'>
        <div className='titlebanner'><h1>Game Sort</h1></div>
        <nav className='menu'>
          <ul className="flex flex-wrap gap-4">
            <li><a href='index.html'>HOME</a></li>
            <li><a href='sort.html'>SORT</a></li>
            <li><a href='lists.html'>LISTS</a></li>
            <li><a href='about.html'>ABOUT</a></li>
            <li><a href='profile.html'>PROFILE</a></li>
            <li><button type='button' id='logout' className='btn-glass'>logout</button></li>
          </ul>
        </nav>
      </header>

      <About />
      <Login />
      <Sort />
      <Lists />
      <Profile />
    
      <footer>
        <p>Author: Myles Ruff</p>
        <a href='https://www.youtube.com/@myolts'>View my awesome stupid channel</a>
        <a href='https://github.com/mistermyleswaite/gameroulette'>GitHub</a>
      </footer>
      </BrowserRouter>
      </>

  );
}



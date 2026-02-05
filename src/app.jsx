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
            <li><NavLink className='nav-link' to=''>HOME</NavLink></li>
            <li><NavLink className='nav-link' to='sort'>SORT</NavLink></li>
            <li><NavLink className='nav-link' to='lists'>LISTS</NavLink></li>
            <li><NavLink className='nav-link' to='about'>ABOUT</NavLink></li>
            <li><NavLink className='nav-link' to='profile'>PROFILE</NavLink></li>
            <li><button type='button' id='logout' className='btn-glass'>logout</button></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/sort' element={<Sort />} />
        <Route path='/lists' element={<Lists />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    
      <footer>
        <p>Author: Myles Ruff</p>
        <NavLink href='https://www.youtube.com/@myolts'>View my awesome stupid channel</NavLink>
        <NavLink href='https://github.com/mistermyleswaite/gameroulette'>GitHub</NavLink>
      </footer>
      </BrowserRouter>
      </>

  );
}



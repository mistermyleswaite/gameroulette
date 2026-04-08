import React from 'react';
import { BrowserRouter, NavLink, Route, Routes} from 'react-router';
import Login from './login/login.jsx';
import Sort from './sort/sort.jsx';
import About from './about/about.jsx';
import Lists from './lists/lists.jsx';
import Profile from './profile/profile.jsx';
import { AuthState } from './login/authState.jsx';


export default function App() {
const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
const [authState, setAuthState] = React.useState(currentAuthState);


    function logout() {
        setAuthState(AuthState.Unauthenticated)
        setUserName('');
        localStorage.removeItem('userName');
    }

  return (
    <>
    <BrowserRouter>
    <header id='headbar'>
        <div className='titlebanner'><h1>Game Sort</h1></div>
        <nav className='menu'>
          <ul className="flex flex-wrap gap-4">
            <li><NavLink className='nav-link' to=''>HOME</NavLink></li>
            {authState === AuthState.Authenticated && (<li><NavLink className='nav-link' to='sort'>SORT</NavLink></li>)}
            {authState === AuthState.Authenticated && (<li><NavLink className='nav-link' to='lists'>LISTS</NavLink></li>)}
            <li><NavLink className='nav-link' to='about'>ABOUT</NavLink></li>
            {authState === AuthState.Authenticated && (<li><NavLink className='nav-link' to='profile'>PROFILE</NavLink></li>)}
            {authState === AuthState.Authenticated && (<li><button type='button' onClick={() => logout()} id='logout' className='btn-glass'>logout</button></li>)}
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={
          <Login 
          userName={userName}
          authState={authState}
          onAuthChange={(userName, authState) => {
            setAuthState(authState);
            setUserName(userName);
          }}
          />
          } 
          exact />
        <Route path='/sort' element={<Sort authState={authState} />} />
        <Route path='/lists' element={<Lists authState={authState} />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile authState={authState} />} />
      </Routes>
    
      <footer>
        <p>Author: Myles Ruff</p>
        <NavLink href='https://github.com/mistermyleswaite/gameroulette'>GitHub</NavLink>
      </footer>
      </BrowserRouter>
      </>

  );
}



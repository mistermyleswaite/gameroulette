import React from 'react';

import { Unauthenticated } from './unauthenticated.jsx';
import { Authenticated } from './authenticated.jsx';
import { AuthState } from './authState.jsx';


function Login({ userName, authState, onAuthChange }) {

  // const response = await fetch('api/auth/login', { ... });

  // if (response.ok) {
  //   setAuthState(AuthState.Authenticated);
  //   navigate('/sort');
  // }
  return (
    <div className='homecontainer'>      
      <main className='content flex flex-wrap'>  
        <div>
        {authState !== AuthState.Unknown && <h1>Welcome to GameSort</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}  
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);            
            }}
          />
        )}
        </div>
      </main>
    </div>  
  );
}

export default Login
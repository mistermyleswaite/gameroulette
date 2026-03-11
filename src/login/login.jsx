import React from 'react';

import { Unauthenticated } from './unauthenticated.jsx';
import { Authenticated } from './authenticated.jsx';
import { AuthState } from './authState.jsx';


function Login({ userName, authState, onAuthChange }) {
  return (
    <div className='homecontainer'>      
      <main className='content flex flex-wrap'>  
        <div>
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
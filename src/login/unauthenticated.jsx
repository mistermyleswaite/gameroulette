import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    
    async function loginuser() {
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({email: userName, password: password}),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (response.ok) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        alert(`Error: ${body.msg || 'Login failed'}`);
      }
    }

    async function createUser() {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        body: JSON.stringify({email: userName, password: password}),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (response.ok) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        alert(`Error: ${body.msg || 'Registration failed'}`);
      }
    }

    return (
        <>
        <p className='logininfo'>Enter your account information to login or register.</p>
        <div className="flex flex-wrap gap-5 m-4">
          <input type='text' className='input-glass' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Email/Username' />
          <input type='password' className='input-glass' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>
      <div className='flex gap-20 m-4'>
        <button onClick={() => loginuser()} disabled={!userName || !password} type='button' className='btn-glass'>
          Login
          </button>
        <button onClick={() => createUser()} disabled={!userName || !password} type='button' className='btn-glass'>
          Register
          </button>
      </div>

        </>
    )
}
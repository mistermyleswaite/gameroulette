import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginuser() {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

      const user = registeredUsers.find(u => u.username === userName && u.password === password);

      if (user) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        alert('Invalid username or password');
        
      }

      
    }

    async function createUser() {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

      if (registeredUsers.find(u => u.username === userName)) {
        alert('User already exists')
        return;
      }

      registeredUsers.push({ username: userName, password: password })
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    }

    return (
        <>
        <p className='logininfo'>Enter your account information to login or register.</p>
        {displayError && <p style={{color: 'red'}}>{displayError}</p>}
        <form method='get' action='sort.html'>
          <div className="flex flex-wrap gap-5 m-4">
            <input type='text' className='input-glass' onChange={(e) => setUserName(e.target.value)} placeholder='Username' />
            <input type='password' className='input-glass' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
        <div className='flex gap-20 m-4'>
          <button onClick={() => loginuser()} disabled={!userName || !password} type='button' className='btn-glass'>
            Login
            </button>
          <button onClick={() => createUser()} disabled={!userName || !password} type='button' className='btn-glass'>
            Register
            </button>
        </div>
        </form>
        </>
    )
}
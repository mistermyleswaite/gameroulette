import React from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginuser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
        <p className='logininfo'>Enter your account information to login or register.</p>
        <form method='get' action='sort.html'>
          <div className="flex flex-wrap gap-5 m-4">
            <input type='text' className='input-glass' onChange={(e) => setUserName(e.target.value)} placeholder='Username' />
            <input type='password' className='input-glass' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
        <div className='flex gap-20 m-4'>
          <button onClick={() => loginuser()} disabled={!userName || !password} type='submit' className='btn-glass'>
            Login
            </button>
          <button onClick={() => createUser()} disabled={!userName || !password} type='register' className='btn-glass'>
            Register
            </button>
        </div>
        </form>
        </>
    )
}
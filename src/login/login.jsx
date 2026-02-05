import React from 'react'

function Login() {
  return (
    <div className='homecontainer'>      
      <main className='content flex flex-wrap'>  
        <p className='logininfo'>Enter your account information to login or register.</p>
        <form method='get' action='sort.html'>
          <div className="flex flex-wrap gap-5 m-4">
            <input type='text' className='input-glass' placeholder='User' />
            <input type='password' className='input-glass' placeholder='Password' />
          </div>
        <div className='flex gap-20 m-4'>
          <button type='submit' className='btn-glass'>Login</button>
          <button type='register' className='btn-glass'>Register</button>
        </div>
        </form>
      </main>
    </div>  
  );
}

export default Login
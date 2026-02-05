import React from 'react'

function Profile() {
  return (
    <main className='container'>  
      <div className='content'>
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
        </div>
        <hr />
        <div>
            <h3>Account Information</h3>
            <ul>
                <li><p>Username: "[user]" </p></li>
                <li><p>SteamID: "[SteamID]" </p></li>
                <li><p>Lists: "<a href="lists.html">[Lists]</a>"</p></li>
            </ul>
            <p>Click here to link SteamID!</p>
            <button type="button" id="steamAPIbutton">SteamAPI button</button>
      </div>
      </main>
  );
}

export default Profile
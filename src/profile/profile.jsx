import React from 'react'

function Profile() {
  return (
    <main className='container'>
        <hr />
        <div className='profile-content'>
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
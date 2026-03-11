import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Profile({ authState }) {
  const navigate = useNavigate();

  useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
    }, [authState, navigate])

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
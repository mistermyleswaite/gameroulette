import React from 'react';
import { useNavigate } from 'react-router';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <>
        <p className='playerName'>Welcome, {props.userName}</p>
        <div className='flex gap-20 m-4'>
          <button onClick={() => navigate('/sort')()} className='btn-glass'>
            Sort
            </button>
          <button onClick={() => logout()} className='btn-glass'>
            Logout
            </button>
        </div>
        </>
    )
}
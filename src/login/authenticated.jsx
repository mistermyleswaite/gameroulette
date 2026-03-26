import React from 'react';
import { useNavigate } from 'react-router';

export function Authenticated(props) {
    const navigate = useNavigate();

    async function logout() {
        try {
            const response = await fetch('api/auth/logout', {
                method: 'delete',
                credentials: 'include',
            });

        if (response.ok) {
            localStorage.removeItem('userName', userName);
            props.onLogout();
        } else {
            localStorage.removeItem('userName', userName);
            props.onLogout();
        }
        } catch (err) {
            console.error("Logout failed", err);
            props.onLogout();
        }

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
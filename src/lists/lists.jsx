import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Lists({ authState }) {
    const navigate = useNavigate();
        const [gameNumber, setGameNumber] = useState(0);
    
        const [unsortedGames, setUnsortedGames] = useState([]);
        const [currentGame, setCurrentGame] = useState(null);
        const [sortedGames, setSortedGames] = useState({
            UPNX: [],
            ALPD: [],
            BKLG: [],
            PTOD: []
        });
        const [sortState, setSortState] = useState(false);
    
        useEffect(() => {
            if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
                navigate('/');
            }

            const storedSorted = localStorage.getItem('sortedGames');
            if (storedSorted) {
            setSortedGames(JSON.parse(storedSorted));
            setSortState(true);
            }
        }, [authState, navigate])
    
  return (
    <main className='container'>
        <div className='content gap-20 flex flex-wrap'>
        <div className='listbox' id='UPNX'>
            <h3>Up Next!</h3>
            <ul className='list' id="UPNX">
                {sortedGames.UPNX.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
        <div className='listbox' id='ALPD'>
            <h3>Already Played</h3>
            <ul className='list' id="ALPD">
                {sortedGames.ALPD.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
        <div className='listbox' id='BKLG'>
            <h3>Backlog</h3>
            <ul className='list' id="BKLG">
                {sortedGames.BKLG.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
        <div className='listbox' id='PTOD'>
            <h3>PIT OF DOOM</h3>
            <ul className='list' id="PTOD">
                {sortedGames.PTOD.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
      </div>
    </main>
  );
}

export default Lists
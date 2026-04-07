import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

export default function Lists({ authState }) {
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

    async function clearList() {
        const emptySorted = {
            UPNX: [],
            ALPD: [],
            BKLG: [],
            PTOD: []
            };
        const emptyUnsorted = [];

        try {
            const response = await fetch('/api/lists', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    unsorted: emptyUnsorted,
                    sorted: emptySorted
                }),
                credentials: 'include',
            });

            if (response.ok) {
                setSortedGames(emptySorted);
                setUnsortedGames(emptyUnsorted);

                localStorage.removeItem('sortedGames');
                alert("Lists cleared successfully!");
            } else {
                console.error("Failed to clear lists on server!", error);
            }
        } catch (error) {
            console.error("clearList Error:", error);
        }
}
    
        useEffect(() => {
            if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
                navigate('/');
                return;
            }

            async function fetchLists() {
                try {
                    const response = await fetch('/api/lists/get');
                    if (response.ok) {
                        const data = await response.json();

                        setUnsortedGames(data.unsorted || []);
                        setSortedGames(data.sorted || {
                            UPNX: [], ALPD: [], BKLG: [], PTOD: []
                        });
                        setSortState(true);

                        localStorage.setItem('sortedGames', JSON.stringify(data.sorted));
                    }
                } catch (error) {
                    console.error("Failed to fetch lists:", error);
                }
            }

            fetchLists();
        }, [authState, navigate])
    
  return (
    <main className='listContainer'>
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
      <button type='button' onClick={() => clearList()} id='clearList' className='btn-glass clearList'>Clear All Lists</button>
    </main>
  );
}

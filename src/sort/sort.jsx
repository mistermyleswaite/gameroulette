import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Sort({ authState }) {
    const navigate = useNavigate();
    const [gameNumber, setGameNumber] = React.useState(0);

    const [unsortedGames, setUnsortedGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [sortedGames, setSortedGames] = useState({
        UPNX: [],
        ALPD: [],
        BKLG: [],
        PTOD: []
    });

    const storedUnsorted = localStorage.getItem('unsortedGames');
    const storedSorted = localStorage.getItem('sortedGames');

    useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
        if (!currentGame && storedUnsorted){
            spin();
        }
    
        if (storedUnsorted) {
            setUnsortedGames(JSON.parse(storedUnsorted));
        } else {
            const newGames = generateGames();
            setUnsortedGames(newGames);
            localStorage.setItem('unsortedGames', JSON.stringify(newGames));
        }

        if (storedSorted) {
            setSortedGames(JSON.parse(storedSorted));
        } else {
            localStorage.setItem('sortedGames', JSON.stringify(sortedGames));
        }
    }, [authState, navigate])

    function generateGames() {
        const games = [];
        for (let i = 1; i <= 100; i++) {
            games.push({
                id: i,
                name: `Game${i}`,
                tags: []
            });
        }
        return games;
    }

    function spin() {
        if (unsortedGames.length === 0) {
            setCurrentGame(null);
            return;
        }

        const randomIdx = Math.floor(Math.random() * unsortedGames.length);
        setCurrentGame(unsortedGames[randomIdx]);
    }

    function sortGame(list) {
        if (!currentGame) return;

        const tagged = {...currentGame, tags: [...currentGame.tags, list] };

        setUnsortedGames(prev => {
            const updated = prev.filter(g => g.id !== currentGame.id);
            localStorage.setItem('unsortedGames', JSON.stringify(updated));
            return updated;
        });

        setSortedGames(prev => {
            const updated = {
                ...prev,
                [list]: [...(prev[list] || []), tagged]
            };
            localStorage.setItem('sortedGames', JSON.stringify(updated));
            return updated;
        });

        spin();
    }


  return (
    <main className='sort-content'>
      <div className='sort-group'>
        <h2>Sort!</h2>
        <div className='game-display'>
            {currentGame ? (
                <p>{currentGame.name}</p>
            ) : (
                <p>No more games to sort!</p>
            )}
            <p> Remaining: {unsortedGames.length} </p>
        </div>
      </div>
      <div className='button-group'>
        <button onClick={() => spin()} type="button" className='btn-glass'>Spin</button>
        <button onClick={() => sortGame("UPNX")} type="button" className='btn-glass'>Up Next</button>
        <button onClick={() => sortGame("ALPD")} type="button" className='btn-glass'>Already Played</button>
        <button onClick={() => sortGame("BKLG")} type="button" className='btn-glass'>Backlog</button>
        <button onClick={() => sortGame("PTOD")} type="button" className='btn-glass'>PIT OF DEATH</button>
      </div>
      <div className='websocket'>
          {/* <p>WebSocket placeholder, goes on the right side</p>
            <table>
                <thead>
                    <td><p>Username</p></td>
                    <td><p>Statbar</p></td>
                    <td><p>Percentage</p></td>
                </thead>
                <tbody>
                    <td><p>Username1</p></td>
                    <td><p>Statbar1</p></td>
                    <td><p>Percentage1</p></td>
                </tbody>
                <tbody>
                    <td><p>Username2</p></td>
                    <td><p>Statbar2</p></td>
                    <td><p>Percentage2</p></td>
                </tbody>
            </table> */}
      </div>
    </main>
  );
}

export default Sort

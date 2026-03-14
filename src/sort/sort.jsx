import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Sort({ authState }) {
    const navigate = useNavigate();

    const [unsortedGames, setUnsortedGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [sortedGames, setSortedGames] = useState({
        UPNX: [],
        ALPD: [],
        BKLG: [],
        PTOD: []
    });

    const spin = useCallback((currentUnsorted) => {
        const list = currentUnsorted || unsortedGames;
        if (list.length === 0) {
            setCurrentGame(null);
            return;
        }
        const randomIdx = Math.floor(Math.random() * list.length);
        setCurrentGame(list[randomIdx]);
    }, [unsortedGames]);

    useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
        async function loadInitialData() {
            try {
                const response = await fetch('/api/lists/get');
                const data = await response.json();
                if (response.ok && data.unsorted && data.unsorted.length > 0) {
                    setUnsortedGames(data.unsorted);
                    setSortedGames(data.sorted);
                    spin(data.unsorted);
                } else {
                    const newGames = generateGames();
                    setUnsortedGames(newGames);
                    spin(newGames);
                }
            } catch (error) {
                console.error("Error loading games:", error);
            }
        }

        loadInitialData();        
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

    // function spin() {
    //     if (unsortedGames.length === 0) {
    //         setCurrentGame(null);
    //         return;
    //     }

    //     const randomIdx = Math.floor(Math.random() * unsortedGames.length);
    //     setCurrentGame(unsortedGames[randomIdx]);
    // }

    async function sortGame(list) {
        if (!currentGame) return;

        const tagged = {...currentGame, tags: [...currentGame.tags, list] };

        const nextUnsorted = unsortedGames.filter(g => g.id !== currentGame.id);
        const nextSorted = {
            ...sortedGames,
            [list]: [...(sortedGames[list] || []), tagged]
        };

        // update the react state before puhsing to backend
        setUnsortedGames(nextUnsorted);
        setSortedGames(nextSorted);

        try {
            await fetch('/api/lists', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    unsorted:nextUnsorted,
                    sorted: nextSorted
                }),
            });
        } catch (error) {
            console.error("Save Error:", error);
        }

        spin(nextUnsorted);
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

export default Sort;
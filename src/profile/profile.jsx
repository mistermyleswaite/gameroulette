import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Profile({ authState }) {
    const navigate = useNavigate();

    const isLoaded = useRef(false);

    const [steamId, setSteamId] = useState('');
    const [unsortedGames, setUnsortedGames] = useState([]);
    const [sortedGames, setSortedGames] = useState({
          UPNX: [],
          ALPD: [],
          BKLG: [],
          PTOD: []
    });

    async function loadInitialData() {
            if (isLoaded.current) return;

            try {
                const response = await fetch('/api/lists/get', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUnsortedGames(data.unsorted || []);
                    setSortedGames(data.sorted || { UPNX: [], ALPD: [], BKLG: [], PTOD: [] });
                    isLoaded.current = true;
                }

            } catch (error) {
                console.error("Error loading games:", error);
            }
    }

    useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
        loadInitialData();
    }, [authState, navigate])

    async function importSteamGames() {
        if (!steamId) return alert("please enter a SteamID64");

        try {
            const response = await fetch(`/api/steam/test/${steamId}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            if (data.success) {
                const importedGames = data.games.map(g => ({
                    id: g.appid,
                    name: g.name,
                    img: g.img_icon_url
                }));

                const existingIds = new Set(unsortedGames.map(game => game.id));
                const newGames = importedGames.filter(g => !existingIds.has(g.id));

                const updatedUnsortedList = [...unsortedGames, ...newGames];

                setUnsortedGames(updatedUnsortedList);

                try {
                    await fetch('/api/lists', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            unsorted: updatedUnsortedList,
                            sorted: sortedGames
                        }),
                        credentials: 'include',
                    });
                } catch (error) {
                    console.error("Save Error:", error);
                }
                alert(`Successfully imported ${data.count} games!`)
        } else {
            alert(data.msg);
        }
    } catch (err) {
        console.error("Import failed:", err);
    }
  }

  return (
    <main className='container'>
        <div className='profile-content'>
            <h3>Account Information</h3>
            <ul>
                <li><p>Username: {localStorage.user} </p></li>
                <li><p>SteamID64: {steamId} </p></li>
                <li><p>Lists: <a href="lists.jsx">[Lists]</a></p></li>
            </ul>
        </div>
        <div className="steam-import-section card p-3 mt-4">
            <h4>Steam Integration</h4>
            <div className="form-group">
                <label htmlFor="steamID">SteamID64</label>
                <input type="text" className='input-glass' placeholder="e.g. 7485994..." value={steamId} onChange={(e) => setSteamId(e.target.value)} />
                <small className="text-muted">
                    Find your ID at <a href="https://steamid.io" target="_blank" rel="noreferrer">steamid.io</a>.
                    Make sure your <b>Game Details</b> are set to <b>Public</b> in Steam privacy settings.
                </small>
            </div>
            <button className="import-btn btn-glass mt-2" onClick={importSteamGames}>
                Import Library
            </button>
        </div>
      </main>
  );
}

export default Profile
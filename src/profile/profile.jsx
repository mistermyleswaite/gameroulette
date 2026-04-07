import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Profile({ authState }) {
  const navigate = useNavigate();
  const [steamId, setSteamId] = useState('');

  async function importSteamGames() {
    if (!steamId) return alert("please enter a SteamID64");

    try {
        const response = await fetch(`/api/stea/test/${steamId}`);
        const data = await response.json();

        if (data.success) {
            const importedGames = data.games.map(g => ({
                id: g.appid,
                name: g.name,
                img: g.img_icon_url
            }));

            setUnsortedGames(prev => {
                const existingIds = new Set(prev.map(game => game.id));
                const newGames = importedGames.filter(g => !existingIds.has(g.id));
                return [...prev, ...newGames];
            });

            alert(`Successfully imported ${data.count} games!`)
        } else {
            alert(data.msg);
        }
    } catch (err) {
        console.error("Import failed:", err);
    }
  }

  useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
    }, [authState, navigate])

  return (
    <main className='container'>
        <div className='profile-content'>
            <h3>Account Information</h3>
            <ul>
                <li><p>Username: "[user]" </p></li>
                <li><p>SteamID: "[SteamID]" </p></li>
                <li><p>Lists: "<a href="lists.html">[Lists]</a>"</p></li>
            </ul>
        </div>
        <div className="steam-import-section card p-3 mt-4">
            <h4>Steam Integration</h4>
            <div className="form-group">
                <label htmlFor="steamID">SteamID64</label>
                <input type="text" className='input-glass' placeholder="e.g. 7485994..." value={steamId} onChange={(e) => setSteamId(e.target.value)} />
                <small className="text-muted">
                    Find your ID at <a href="https;//steamid.io" target="_blank" rel="noreferrer">steamid.io</a>.
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
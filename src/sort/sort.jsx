import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthState } from "../login/authState";

function Sort({ authState }) {
  const navigate = useNavigate();
  const isLoaded = useRef(false);
  const socketRef = useRef(null);

  const [unsortedGames, setUnsortedGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [sortedGames, setSortedGames] = useState({
    UPNX: [],
    ALPD: [],
    BKLG: [],
    PTOD: [],
  });


  const spin = useCallback(
    (currentUnsorted) => {
      const list = currentUnsorted || unsortedGames;
      if (list.length === 0) {
        setCurrentGame(null);
        return;
      }
      const randomIdx = Math.floor(Math.random() * list.length);
      setCurrentGame(list[randomIdx]);
      setSelectedCategories([]);
    },
    [unsortedGames],
  );

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if (
      authState === AuthState.Unauthenticated ||
      authState === AuthState.Unknown
    ) {
      navigate("/");
    }

    async function loadInitialData() {
      if (isLoaded.current) return;
      try {
        const response = await fetch("/api/lists/get", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUnsortedGames(data.unsorted || []);
          setSortedGames(
            data.sorted || { UPNX: [], ALPD: [], BKLG: [], PTOD: [] },
          );
          if (data.unsorted?.length > 0) spin(data.unsorted);
          isLoaded.current = true;
        }
      } catch (error) {
        console.error("Error loading games:", error);
      }
    }
    loadInitialData();

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const hostname = window.location.host;
    const newSocket = new WebSocket(`${protocol}://localhost:3000`);

    newSocket.onopen = () => console.log("WebSocket connected to Gamesort");
    newSocket.onmessage = async (event) => {
        try {
            const text = await event.data.text();
            const data = JSON.parse(text);
            
            console.log("WebSocket Received:", data);

            const newMessage = {
                id: Date.now(),
                text: `${data.user} sorted ${data.game}!`
            }

            setMessages(prev => [...prev, newMessage]);

            setTimeout(() => {
                setMessages(prev => prev.filter(m => m.id !== newMessage.id));
            }, 4000);
        } catch (err) {
            console.log("WS Data:", event.data);
        }
    };

    socketRef.current = newSocket;

    return () => {
        if (socketRef.current) {
            socketRef.current.close();
        }
    };
  }, [authState, navigate, spin]);

  function toggleCategory(listKey) {
    setSelectedCategories((prev) =>
      prev.includes(listKey)
        ? prev.filter((item) => item !== listKey)
        : [...prev, listKey],
    );
  }

  async function sortGame() {
    if (!currentGame || selectedCategories.length === 0) return;

    const taggedGame = {
      ...currentGame,
      tags: [...(currentGame.tags || []), ...selectedCategories],
    };

    const nextUnsorted = unsortedGames.filter((g) => g.id !== currentGame.id);
    const nextSorted = { ...sortedGames };

    selectedCategories.forEach((cat) => {
      nextSorted[cat] = [...(nextSorted[cat] || []), taggedGame];
    });

    setUnsortedGames(nextUnsorted);
    setSortedGames(nextSorted);

    const userName = localStorage.getItem('userName');

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
            user: userName || 'A gamer',
            game: currentGame.name
        }));
    }

    try {
      await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unsorted: nextUnsorted,
          sorted: nextSorted,
        }),
        credentials: "include",
      });
    } catch (error) {
      console.error("Save Error:", error);
    }

    spin(nextUnsorted);
  }

  return (
    <main className="sort-page">
      {/* WebSocket!! */}
      <div className="chat-feed-container">
        {messages.map((msg => (
            <div key={msg.id} className="chat-bubble">
                {msg.text}
            </div>
        )))}
      </div>

      <div className="sort-header">
        <h2>Sort Your Library</h2>
        <span className="badge-remaining">
          Remaining: {unsortedGames.length}
        </span>
      </div>

      <div className="sort-main-container">
        <div className="game-card-large">
          <div className="image-placeholder">
            {currentGame ? (
              <img
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${currentGame.id}/${currentGame.img}.jpg`}
                alt={currentGame.name}
              />
            ) : (
              <div className="no-image">?</div>
            )}
          </div>
          <h3>{currentGame ? currentGame.name : "All Sorted!"}</h3>
        </div>
        <div className="sort-controls">
          <div className="category-buttons">
            {["UPNX", "ALPD", "BKLG", "PTOD"].map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`btn-glass btn-sort ${selectedCategories.includes(cat) ? "active " + cat : ""}`}
              >
                {cat === "UPNX" && "Up Next"}
                {cat === "ALPD" && "Already Played"}
                {cat === "BKLG" && "Backlog"}
                {cat === "PTOD" && "PIT OF DEATH"}
              </button>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={() => spin()} className="btn-glass">
              Skip
            </button>
            <button
              onClick={sortGame}
              className="btn-confirm btn-glass"
              disabled={selectedCategories.length === 0}
            >
              Sort
            </button>
          </div>
      </div>
    </div>
    </main>
  );
}

export default Sort;

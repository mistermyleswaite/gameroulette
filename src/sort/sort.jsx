import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthState } from '../login/authState';

function Sort({ authState }) {
    const navigate = useNavigate();
    const [gameNumber, setGameNumber] = React.useState(0);

    useEffect(() => {
        if (authState === AuthState.Unauthenticated || authState === AuthState.Unknown) {
            navigate('/');
        }
    }, [authState, navigate])

    function spin() {
        setGameNumber(gameNumber + 1);
    }

    function countClick() {
        console.log('count')
    }

  return (
    <main className='container'>
      <div className='content'>
        <h2>Sort!</h2>
        <div className='game-display'>
            {/*current game goes here*/}
            <p> Game {gameNumber}</p>
        </div>
      </div>
      <div className='button-group'>
        <button onClick={() => spin()} type="button" className='btn-glass'>Spin</button>
        <button onClick={() => spin()} type="button" className='btn-glass'>List1</button>
        <button onClick={() => spin()} type="button" className='btn-glass'>List2</button>
        <button onClick={() => spin()} type="button" className='btn-glass'>List3</button>
        <button onClick={() => spin()} type="button" className='btn-glass'>List4</button>
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

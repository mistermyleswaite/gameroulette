import React from 'react'

function Sort() {
  return (
    <main className='container'>
      <div className='content'>
        <div>
            <h2>Sort!</h2>
            <p>placeholder roulette image</p>
            <img src="/cute.jpg" width='200em' height='200em' className="roulette" alt="placeholder image." />
            <svg id="roulette" src="/cute.jpg"></svg>
            <button type="button" id="addlist">Add to List</button>
            <button type="button" id="skipsort">Skip</button>
        </div>
        <hr />
      </div>
      <div className='websocket'>
          <p>WebSocket placeholder, goes on the right side</p>
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
            </table>
        </div>
    </main>
  );
}

export default Sort

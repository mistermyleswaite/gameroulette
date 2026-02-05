import React from 'react'

function Sort() {
  return (
    <main className='container'>
      <div className='content'>
        <div>
            <h2>Sort!</h2>
            <p>placeholder roulette image</p>
            <img src="./images/cute.jpg" width='200em' height='200em' className="roulette" alt="placeholder image." />
            <svg id="roulette" src="./images/cute.jpg"></svg>
            <button type="button" id="addlist">Add to List</button>
            <button type="button" id="skipsort">Skip</button>
        </div>
        <hr />
      </div>
      <div className='websocket'>
          <p>WebSocket placeholder, goes on the right side</p>
            <table>
                <th>
                    <td><p>Username</p></td>
                    <td><p>Statbar</p></td>
                    <td><p>Percentage</p></td>
                </th>
                <tr>
                    <td><p>Username1</p></td>
                    <td><p>Statbar1</p></td>
                    <td><p>Percentage1</p></td>
                </tr>
                <tr>
                    <td><p>Username2</p></td>
                    <td><p>Statbar2</p></td>
                    <td><p>Percentage2</p></td>
                </tr>
            </table>
        </div>
    </main>
  );
}

export default Sort

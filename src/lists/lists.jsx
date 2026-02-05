import React from 'react'

function Lists() {
  return (
    <main className='container'>
        <div className='content gap-20 flex flex-wrap'>
        <div className='listbox' id='upnextbox'>
            <h3>Up Next!</h3>
            <ul className='list' id="upnext">
                <li><h5>list1</h5></li>
                <li><p>game1</p></li>
                <li><p>game2</p></li>
                <li><p>game3</p></li>
                <li><p>game4</p></li>
                <li><p>game5</p></li>
            </ul>
        </div>
        <div className='listbox' id='alrplayedbox'>
            <h3>Already Played</h3>
            <ul className='list' id="alrplayed">
                <li><h5>list2</h5></li>
                <li><p>game1</p></li>
                <li><p>game2</p></li>
                <li><p>game3</p></li>
                <li><p>game4</p></li>
                <li><p>game5</p></li>
            </ul>
        </div>
        <div className='listbox' id='skipbox'>
            <h3>Skip</h3>
            <ul className='list' id="skip">
                <li><h5>list3</h5></li>
                <li><p>game1</p></li>
                <li><p>game2</p></li>
                <li><p>game3</p></li>
                <li><p>game4</p></li>
                <li><p>game5</p></li>
            </ul>
        </div>
        <div className='listbox' id='doombox'>
            <h3>PIT OF DOOM</h3>
            <ul className='list' id="pitofdoom">
                <li><h5>list4</h5></li>
                <li><p>game1</p></li>
                <li><p>game2</p></li>
                <li><p>game3</p></li>
                <li><p>game4</p></li>
                <li><p>game5</p></li>
            </ul>
        </div>
      </div>
    </main>
  );
}

export default Lists
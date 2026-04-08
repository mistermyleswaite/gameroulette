import React from 'react'

function About() {
  return (
    <main className='container'>
      <div className='content flex-col flex-wrap align-middle justify-center-safe gap-5'>
        <h1>How to use:</h1>
        <p>To be able to use Gamesort, you must have a Steam Account, and the privacy settings must be set to public. Then, you can find your SteamID64 from steamid.io. When sorting, you can choose any number of lists to apply, then save. Due to limitations in the design, when clearing the lists, you must import all the games again. </p>
        <h1>Myles Ruff</h1>
        <img id='pfp' className='rounded-full justify-center' src="/mypfp.jpg" alt="Myles' beautiful face" width='200em' height='300em'/>
        <ul className='gap-5 m-4'>
            <li className='align-middle justify-center'><p>Favorite Song:</p>
                <iframe className='block mx-auto' data-testid="embed-iframe" style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/track/6WTHWki7Q1oNExA2gOf5Wf?utm_source=generator&theme=0" width="50%" height="50%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></li>
        </ul>
      </div>
    </main>
  );
}

export default About

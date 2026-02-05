import React from 'react'

function About() {
  return (
    <main className='container'>
      <div className='content flex-col flex-wrap align-middle justify-center-safe gap-5'>
        <img id='pfp' className='rounded-full justify-center' src="/mypfp.jpg" alt="Myles' beautiful face" width='200em' height='300em'/>
        <h1>Myles Ruff</h1>
        <ul className='gap-5 m-4'>
            <li className='m-4'><a href="https://www.youtube.com/@myolts">YouTube</a></li>
            <li className='align-middle justify-center'><p>Favorite Song:</p>
                <iframe className='block mx-auto' data-testid="embed-iframe" style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/track/6WTHWki7Q1oNExA2gOf5Wf?utm_source=generator&theme=0" width="50%" height="50%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></li>
            <li><p>Favorite Game:</p>
                <a href="https://hytale.com">HYTALE!</a></li>
        </ul>
      </div>
    </main>
  );
}

export default About

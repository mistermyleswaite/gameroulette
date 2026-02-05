import './Header.css'

function Header() {

  return (
    <>
      <header id='headbar'>
        <div class='titlebanner'><h1>Game Sort</h1></div>
        <nav class='menu'>
          <ul class="flex flex-wrap gap-4">
            <li><a href='index.html'>HOME</a></li>
            <li><a href='sort.html'>SORT</a></li>
            <li><a href='lists.html'>LISTS</a></li>
            <li><a href='about.html'>ABOUT</a></li>
            <li><a href='profile.html'>PROFILE</a></li>
            <li><button type='button' id='logout' class='btn-glass'>logout</button></li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
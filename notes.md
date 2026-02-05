# CS 260 Notes

[My startup - Simon](https://simon.myolts.com)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.208.186.120. 
I have an ssh alias set for 'ssh gamesort'.

## Caddy

I failed to edit the file initially, but I didn't notice because I was still able to see the site despite not being on the http(S)//: protocol. It said not secure in the top right, and I missed the fact that I was supposed to change that.

## HTML

This part took a bit longer than I'd like, as I didn't know what convention was to the semantic structure of the page. As such, I've done a LOT of restructuring, but it feels a little more solid now.

## CSS

This was by far the most time-consuming part of the project. I spent an inordinate amount of time simply configuring the tailwind css library to work, and as I'm writing this, I'm still waiting for the library to finish deploying on my server.


## React Part 1: Routing

I struggled with this because of a Spotify embed I had in my about page. I had to majorly reconstruct every part of the document, but like before, the structure is much better now and each element integrates well enough with each other. I have concerns about using tailwind to further stylize the different pages, but as of right now, we're good.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

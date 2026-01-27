# Game Roulette

[My Notes](notes.md)

Game Roulette is a webapp that allows the user to create a list of games from any SteamID by grabbing information from the Steam API and randomly presenting the user with a single game from that list at a time. The user can then tag each game as they wish, and can view the lists of other users and their SteamID's.

<!-- > [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item. -->

<!-- > [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing. -->

## 🚀 Specification Deliverable

<!-- > [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration. -->

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Game Roulette allows users to explore backlogged games in their catalogue and expand their horizons to games they may not have considered before. Rather than encouraging players to spend _MORE_ money, Game Roulette aims to inspire players to find value in what they already have, and tailor their personal taste accordingly. 

### Design

![Design image](designpic.png)

The user will interact directly by supplying their login information and their SteamID (once their account has been created.) This will give them access to a "save state" of their tagged lists, and allow them to begin the roulette. This will display a spinning wheel that will randomly select a game and allow the user to tag the game, thus removing it from the wheel. 
On the start page, the user can see progress bars of sorted lists from other users. 

### Key features

- Gathering and sorting games queried from SteamAPI
- Selecting and presenting a game at random
- Storing tagged lists of game objects to be called/organized and displayed globally

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - This will be used to build the core logic of the three pages- defining elements, where they are and what they do.
- **CSS** - This will be used to stylize the site and make it visually pleasing. The core use here will be color coding the tags to ensure that the user can quickly understand the purpose of each button/navigate the program easily
- **React** - This will be used to track user inputs and update the game lists with tags, adding and removing them from tag lists, and creating an interactive, responsive roulette wheel/tagging system to keep it separate from the core structure of the site. 
- **Service** - This will be used to determine the particular endpoints through which the server can be accessed, particularly to send `tag` and `get_list` requests aside from the `login` and `get_id` endpoints. 
- **DB/Login** - This will be used to authenticate users with a simple username and password so only the correct user can sort their lists. This will remember which users owned which data. 
- **WebSocket** - This will be used to automatically update global list data to provide progress bars of other's lists to scroll past, so the current user can see the stats of other users. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [myolts.com](https://myolts.com).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Added lists.html, sort.html, and about.html
- [x] **Proper HTML element usage** - Proper use of lists, headers, navs, etc.
- [x] **Links** - Each page has a link to every other page, and the about page has a link to my YouTube channel and an embed of my favorite song.
- [x] **Text** - I used text to indicate what elements will be in which places.
- [x] **3rd party API placeholder** - Placeholders for SteamAPI in place
- [x] **Images** - AboutMe profile pic and GameSort icon placeholders in place
- [x] **Login placeholder** - Login boxes available on homepage and profile page
- [x] **DB data placeholder** - Lists.html contains lists with placeholders for DB info (pulling list info to display)
- [x] **WebSocket placeholder** - Home page (later to be added to other pages) has a placeholder for a scrolling box of tables that contain other users info with displayname and sorting progress bar.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

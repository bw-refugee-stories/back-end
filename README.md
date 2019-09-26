# Back-End for Refugee Stories Build Week
Database, server/api, authentication, testing

# Deployed at
https://refu-stories-api.herokuapp.com/

## Project title
Refugee Stories (Server)

## Motivation
People visiting the site will gain a better understanding of the refugee crisis and what it means to be a refugee. There are more people displaced in the world today than at any time since the end of World War II and it is more important than ever to help people develop empathy for each other.

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

<b>Built with</b>
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)

## Features
What makes your project stand out?

## Installation
Clone
Fork
NPM Install

## API Reference
 # Register new user (post)
 https://refu-stories-api.herokuapp.com/users/register
 expects username, and password. will return username and authZ token

 # Login (post)
 https://refu-stories-api.herokuapp.com/users/login
 expects username, and password. will return username and authZ token

 # Get all user stories (get)
 https://refu-stories-api.herokuapp.com/stories
 Doesn't expect anything -- unsecure route -- returns JS object of stories

 # Get by story id (get)
 https://refu-stories-api.herokuapp.com/stories/:id
 Doesn't expect anything -- unsecure route -- returns JS object of story with id matching the url

 # Get PENDING stories (get)
 https://refu-stories-apiherokuapp.com/stories/a/pending
 returns a list of ONLY pending stories. must be logged in as admin

 # Post a new story (post)
 https://refu-stories-api.herokuapp.com/stories
 expects a body with title, contents, and pending.
 body can also include name, email, and user_id
 resolves to the newly added story

 # Edit an existing story (put)
 https://refu-stories-api.herokuapp.com/stories/:id
 expects a body with contents, and story_id 

 # Remove an existing story (delete)
 https://refu-stories-api.herokuapp.com/stories/:id
 doesn't expect anything

 # Get a story's comments (get)
 https://refu-stories-api.herokuapp.com/stories/:id/comments
 doesn't expect anything, returns array of comments

 # Add a comment to a story (post)
 https://refu-stories-api.herokuapp.com/stories/:id/comments
 requires contents and story_id in the req.body
 returns the created comment

 # Delete a comment (delete)
 https://refu-stories-api.herokuapp.com/stories/comments/:id
 returns 'deleted' and 1 if successful -- deleted and 0 if there was no comment

## Tests
npm run server
npm run test

## Contribute
Contact the author - https://ixlives.github.io/

## License
- [MIT] (https://opensource.org/licenses/MIT)

MIT © [IX Lives](Ian Bryant)
# Movie DB

React based movie db using redux, and pulling from The MovieDB(TMDb).
This allows you to sign in with your TMDb user, and search through TV shows, you can also add/remove these shows to a watchlist.
You can manage your watchlist from a watchlist page once singed in.

This project can be found running on GH pages via [MovieDB](https://trojincat.github.io/MovieDB/)

---

```
|-- public                      static files to be deployed (in version control)
|-- src
    |-- __snapshots__           App.js snapshots
    |-- api                     interface for all API calls to TMDb
    |-- components              React components
        |-- __snapshots__       Holds the component snapshots
    |-- constants               constants
    |-- containers              "smart" React components
        |-- __snapshots__       Holds the container snapshots
    |-- helper                  Holds reusable functions
    |-- navigation              contains reactRouter
    |-- state                   contains Redux state
    |-- styles                  contains css
    |-- .eslintrc               contains eslintrc rules
    |-- app.js                  root React component
    |-- app.test.js             Snapshot test for App.js
    |-- index.js                app entry point
    |-- setupTests.js           setup for tests

```

---

## HOW TO SETUP

You will need Node and NPM installed

1. A TMBd user is needed to test the application [Sign up for user](https://www.themoviedb.org/)
2. Sign up and grab an API key
3. Clone this repo `git clone https://github.com/TrojinCat/MovieDB.git`
4. Move into MovieDB directory
5. Run `npm install`
6. Semantic-UI will ask a few questions
   1. Enter
   2. Enter
   3. Yes
   4. Enter
   5. Enter
7. To start the project run `npm start`
8. The server should be on port `http://localhost:3000/`, go to a browser and enter that in
9. Sign into the site with your username and password

#### To Run snapshots

1. yarn test
2. Then press A

## Writing new code

Inline exports of functions

- Tab =to 2 spaces

Imports are to be

- Node Modules
- Local Modules

### TODO:

- [x] Organise Redux into state folder
- [x] Organise CSS into styles folder
- [x] Fix year to only return year not entire date for tv list
- [x] Fix floating point return on movie precentage
- [x] JEST Snapshots
- [ ] Enzyme testing
- [x] Fix LoginBar
- [ ] Mobile responsive css fix
- [ ] Clean up functions into helper file for reusable tools
- [ ] Add in guideline on how to write new code
- [ ] Stop a sign in from removing what tv search you were looking at
- [ ] Ability to sort watchList and returned TV shows
- [ ] Ability to change pages, from returned TV shows
- [ ] CSS theme
- [ ] For language display have it show "English" not just "En"

## Built With

- [Create React App](https://github.com/facebook/create-react-app)
- [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI-React)
- [AXIOS](https://github.com/axios/axios)

---

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

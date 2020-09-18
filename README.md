A simple Hacker News reader clone.</br>

Written using React and TypeScript.

### Getting started

1. `git clone`

```
$ git clone https://github.com/jefcurtis/hackernews-reader
$ cd hackernews-reader
```

2. `npm install`

3. `npm start`

A production build is generated into the `build` directory and is being served.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

This build version of the app has offline functionality enabled.<br />
You can test this after opening the site in Chrome:

- Opening the inspector
- Click on the "Application" tab
- Check the "Offline" checkbox

Any stories previously visible on the page should be accessible offline.

### Development

`npm run start:dev`

This command runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. Happy coding.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm build`

Builds the app for production to the `build` folder.<br />

### Project notes and future improvement

Given the original time restraint on building this app, the project is left
with some work to be done and it's compiled here:

#### Testing

- Extending the test coverage to include testing the use of [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker) (offline mode)
- Also adding test coverage for the use of [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  as a means of performing infinite scrolling. Both of these uses are currently mocked out in
  the test to allow for compenent testing.
- Component testing was added for a few components more as an example. Follow up work would be to
  reach 100% coverage in this area.

#### functionality

- There is a 500ms wait before first the app loads stories to allow for the service worker and listeners to
  register and install. More time is needed to investigate a better solution for this.
- While infinite scrolling works well and allows for stories to be painted to the page as soon as they are
  fetched, sadly the limit is 500 of the most recent stories. Understand how the Hacker News API handles
  pagination and implementing a true infinte story reading feature would be a great improvement.
- It seems the app doesn't register the service workers and cache fetch request. Unclear on why this is
  behaving differently in Firefox. MOAR testing needed!

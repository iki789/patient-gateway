[![N|Solid](https://i.imgur.com/zd4cZiz.png)]()
# Patient Gateway

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

Patient Gateway is a front-end dashboard built to help doctors monitor they patients. This enables doctors to view they patients, they blood samples and variants.

##### View your patients, samples and varients at a glance.
  ![GIF](https://i.imgur.com/8bu9LSO.gif)

## Improvements:
  - Sort your data 
  - Form validation
  - Server-side pagination
  - Lazy load component for a quick First Meaningful Paint 
  - View samples within date range
   ![DateRangeGIF](https://i.imgur.com/z8clyWt.gif)

## Tech

Patient Gateway uses a number of open source projects to work properly:

* [ReactJs] - front-end library enhanced for web apps!
* [TypeScript] - a superset of JavaScript
* [Redux] - elegent state management library
* [Material UI] - great material UI components for modern web apps
* [Webpack] - a module bundler


## Installation

Patient Gateway requires [Node.js](https://nodejs.org/) v4+ and [TypeScript]  to run.

```$
$ npm install -g typescript
```

Clone and install dependencies and devDependencies.
```sh
$ git clone https://github.com/iki789/patient-gateway.git
$ cd patient-gateway
$ npm install
```

Start development server on http://localhost:3000 and view it in the browser.
```sh
$ npm start
```
## Deployment

To build for production environments.

```sh
$ npm run build
```
Patient Gateway is ready to be deployed! 
>You say the build is 24Mbs😱
This is because a database dump is bundled with webpack. This will be the largest chunk located in `./build/static/js`

You can deploy finally the build on https://localhost:5000 using:

```sh
npm install -g serve
serve -s build
```


License
----

[No License]



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Material UI]: <https://material-ui.com/>
   [ReactJs]: <https://reactjs.org/>
   [Redux]: <https://react-redux.js.org/>
   [Webpack]: <https://webpack.js.org/>
   [No License]: <https://choosealicense.com/no-permission/>


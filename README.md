# [2016-platform](https://github.com/epikhighs/2016-platform)

What I have working so far

1. babel
    - Configured babel to have proper support for the features we want with ES next.
    - got babel-loader working to translate ES6 code & modules
1. webpack
    - webpack-validator
        - validates webpack.config against a schema
    - html-webpack-plugin
        - auto generates html (can use this to auto generate demo fixtures as well that will encapsulate isolated features of the app)
        - specifying a template to base the generated html that has google font loader and google analytics - proving it's compatible w/ these 3rd party libs.
    - favicons-webpack-plugin
        - handles cross-platform favicon output based on a PNG source 
    - building output
1. AMD compatibility
    1. loaded in AMD module
    1. loaded in AMD module from ES6 module
    1. loaded in ES6 module from AMD module
    
Todo

1. AMD compatibility
    1. first load in vendors from js/vendor
    1. then load in most of vendors form npm directly
1. dev environment setup
    1. hot module replace HMR
    1. less to CSS packing
    1. how to load in TPLs or convert to HBS?
1. prod env setup
    1. get common chunks shared

## babel
* babel-cli contains babel and the cli
* babel-core contains the Node API and require hook
* babel-runtime namespaces the ES2015 features instead of adding to global scope
* babel-polyfill when required/imported adds ES2015 API to global scope
    * babel-node command includes babel-polyfill automatically
    * probably won't need to use babel-polyfill.  babel-runtime should be used since there is transpile step anyways.

## webpack
* dev responsibilities
    * pack all resources/assets into JS
        * pack css
        * pack imgs
        * pack svgs
        * pack js
        * pack/inline SVG as text and inject into body during bootup
    * eslint (https://www.npmjs.com/package/eslint_d)
* prod responsibilities (in addition to dev responsibilites)
    * dedupe plugin
    * minify js
    * minify css
    * js source maps
    * css source maps
    * create seperate bundles (vendor.js vs. app.js)
    * extract CSS outside of the pack
        * extract text plugin
        * can get flash of unstyled content otherwise
        * html-webpack-plugin will auto detect and inject the CSS styles
* it is recommended using path.join for cross-platform to deal with all the path stuff.
https://www.npmjs.com/package/webpack-validator
https://www.npmjs.com/package/html-webpack-plugin
https://www.npmjs.com/package/favicons-webpack-plugin

## integrating into existing require.js app
* Approach 1: replace require.js with webpack entirely
    * replace all require's and all require.js responsiblity to webpack
* require to webpack: https://gist.github.com/xjamundx/b1c800e9282e16a6a18e

## react
* preact
* react-lite

## purifycss remove unused css (works with SPAs)
* can be useful for using 3rd party vendor css (e.g. bootstrap) where you don't use all their styles

## stampit
* https://medium.com/javascript-scene/3-different-kinds-of-prototypal-inheritance-es6-edition-32d777fa16c9#.78gxnndv6
## moment
* http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
```javascript
    {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // saves ~100k from build
        ]
    }
```
## svgs
* webpack loaders for svgs
    * svg-react: Load SVG files as JSX-ified React.createClass declarations.
    * svg-url: Loads SVG file as utf-8 encoded data:URI string.
    * svg-as-symbol: Wraps content of root element of source SVG file inside symbol element and returns resulting markup.
    * svg-sprite: Like style-loader but for SVG: it creates a single SVG sprite from a set of images, appends it to DOM and returns relative symbol url to be used with svg’s <use>.
    * line-art: Inlines SVG files, converting all of its nodes to paths. Useful for line art animations in React components.
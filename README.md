# 2016-platform

What I have working so far
1. Configured babel to have proper support for the features we want with ES next.
2. got babel-loader working to translate ES6 code & modules

Todo
1. webpack-validator
1. hookup html-webpack-plugin
1. favicons-webpack-plugin
 
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
* I like to use path.join, but path.resolve would be a good alternative. See the Node.js path API for further details.
    * it is recommended that using path.join for cross-platform to deal with all the path stuff.
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

## moment
* http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
```javascript
    {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // saves ~100k from build
        ]
    }
```
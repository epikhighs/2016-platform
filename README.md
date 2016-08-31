# [2016-platform](https://github.com/epikhighs/2016-platform)

## Quick start

1. npm run-script build-webpack-dll
1. npm run-script start-webpack-dev-server
1. goto http://localhost:8080

## What I have working so far

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
    - cleaning /dist on build
    - building output
        - AMD/ES6 mixed output
        - ES6 only output
    - hot module replacement (HMR) works
    - debugging works w/ source maps enabled however devtool: 'source-map' only works
        - 'eval-source-map' has mixed results w/ AMD modules where nested functions are break pointable but not outer define lvl functions.
    - DLL for vendor files - source maps are included as well so can remote debug.
        - recompile time is less than 500ms now.
    - sass/less to CSS packing
    - svg store plugin works for our use case 
    - got css/js min and source map working for prod/dev env
1. AMD compatibility
    1. for application code
        1. loaded in AMD module
        1. loaded in AMD module from ES6 module
        1. loaded in ES6 module from AMD module
    1. for vendor code (no shim - e.g. moment.js)
        1. loaded in AMD module from es6 module
        1. loaded in AMD module from AMD module
1. Testing
    1. Using mocha to run tests
        1. limitations
            1. can debug through IDE with mocha config, but startup is slow.  Can't enable watch with this config
            1. ONLY pass in *.spec.jsx or *.spec.js files b/c requiring in files that mix in AMD module formats are not supported.  We would need webpack to create chunks for this.
                1. As a side effect, in the .spec files, you can not import files that use non ES6 module formats.
        1. Enhanced with babel-plugin-webpack-alias to be able to use alias'd paths in test specs from webpack.config.js
            1. using cross-env to support passing the NODE_ENV variable to .babelrc
        1. mocha.opts
            1. --require jsdom-global/register to support headless browser support.  It adds in global vars that is expected of a browser environment.
            1. --compilers js:babel-core/register to support transpiling .jsx & .js files with babel (https://babeljs.io/docs/usage/require/)
             
1. 3rd party vendor libs
    1. loaded 3rd party vendor code that doesn't need to be shimmed via npm/package.json config
    1. needed to use ProvidePlugin to add jQuery, $ and window.jQuery to global scope
    1. still keeping local copy of kendo until they figure out how to use a private NPM for distro
    1. loaded in 3rd party CSS as DLL
1. Existing app compatibility
    1. using underscore-template-loader instead of tpl!
    1. using json-loader instead of text!
    1. using raw-loader to load tpl-hash based TPLs
1. Breaking changes
    1. need to change TPL require syntax
    1. need to change tpl-hash based TPLs to .tpx extension
    1. need to change json imports to use json-loader
    1. Need to set /src as resource root for ctrl+click in IDE to work

Todo

1. directory structure
    1. http://jaysoo.ca/2016/02/28/organizing-redux-application/
    1. put css alongside components in same directory?
    1. keep styles inline, but have global styles
1. dev environment setup
    1. get tests running
1. prod env setup
    1. get tests running
    1. figure out hwo to exclude so bamboo deploy can provide conf.json
1. app compatibility changes
    1. update paths for vendor css and image assets
1. testing
    1. babel-register and react-addons-test-utils was added to devDeps due to temp solution to just get JS test working in node might swap this out for karma or some other method.

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
* process.env.npm_lifecycle_event is the key under 'scripts' for package.json
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

## svgs
* webpack loaders for svgs
    * svg-react: Load SVG files as JSX-ified React.createClass declarations.
    * svg-url: Loads SVG file as utf-8 encoded data:URI string.
    * svg-as-symbol: Wraps content of root element of source SVG file inside symbol element and returns resulting markup.
    * svg-sprite: Like style-loader but for SVG: it creates a single SVG sprite from a set of images, appends it to DOM and returns relative symbol url to be used with svg’s <use>.
    * line-art: Inlines SVG files, converting all of its nodes to paths. Useful for line art animations in React components.
    
## links
* https://www.npmjs.com/package/webpack-webstorm-debugger-script
* ./node_modules/webpack/bin/webpack.js --profile --json > stats.json
* http://webpack.github.io/analyse/
* http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/
* http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/


## testing
* https://github.com/CodingZeal/react-boilerplate
* http://randycoulman.com/blog/2016/04/05/more-on-testing-with-mocha-and-webpack/
    * maybe just use karma instead afterall?


https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
https://github.com/lelandrichardson/enzyme-example-mocha/blob/master/package.json
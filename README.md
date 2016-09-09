##ES7 decorators and webpack loader

###Description
To create isomorphic [wire.js](https://github.com/cujojs/wire) specifications use `@client` and `@server` es7 decorators and webpack [loader](https://github.com/designeng/wire-decorators/blob/master/webpack/loaders/specLoader.js).

###Project current mode
Developers preview mode.


###Usage:
Write in `some.spec.js` wire.js specification:

```js
const spec = {
    $plugins: [
    ],

    @client
    clientEvents: {
        click: 'clickHandler',
        mouseover: 'mouseoverHandler',
        mouseout: 'mouseoutHandler'
    },

    @server
    serverComponent: {
        . . . . . 
    },

    @server
    anotherServerComponent: {
        . . . . . 
    }
}
```
Import compatible with webpack [essential-wire](https://github.com/designeng/essential-wire):
```js
import wire from 'essential-wire';
import spec from './some.spec';

wire(spec)
    .then(context => {
        //work with created context
    })
    .otherwise(error => console.log("ERROR: ", error))
```

###Run on the server side
Define `process.env` variable `ENVIRONMENT` in `package.json` script:
```json
"scripts": {
    "start": "ENVIRONMENT=server node ./runner"
}
```
On the server side components marked as `client` will be removed from specification object.

###Webpack compilation for client side
In `webpack.config.js` (note the loaders order):

```js
module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
        {   
            test: /\.spec\.js$/,
            // TODO: publish specLoader to npm!
            loaders: [path.join(__dirname, './webpack/loaders/specLoader.js')],
            exclude: /node_modules/
        }
    ]
},
```
Then run `npm run webpack` command. All component marked as `server` will be rewritten:
```js
const spec = {
    $plugins: [
    ],

    clientEvents: {
        click: 'clickHandler',
        mouseover: 'mouseoverHandler',
        mouseout: 'mouseoutHandler'
    },

    serverComponent: null,

    anotherServerComponent: null
}
```
Note, that all `@client` decorators were removed as well. Decorators `import` will be cleaned up on the optimization phase (uglifyJS).

It's anough for specification wiring without errors.
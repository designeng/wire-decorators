##ES7 decorators and webpack loader

To create isomorphic [wire.js](https://github.com/cujojs/wire) specifications use `@client` and `@server` es7 decorators and webpack [loader](https://github.com/designeng/wire-decorators/blob/master/webpack/loaders/specLoader.js).

#Usage:
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
        create: {
            module: (events) => {
                return events;
            },
            args: [
                {'$ref': 'clientEvents'}
            ]
        }
    },

    @server
    anotherServerComponent: {
        
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
#Webpack compilation:
In webpack.config.js:

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
            # (TODO: publish specLoader to npm!) #
            loaders: [path.join(__dirname, './webpack/loaders/specLoader.js')],
            exclude: /node_modules/
        }
    ]
},
```
Then run `npm run webpack` command.
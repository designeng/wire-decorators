##ES7 decorators and webpack loader

#Usage:
Write in `some.spec.js`:

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
In your webpack.config.js:

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
Then run `npm run webpack` script.
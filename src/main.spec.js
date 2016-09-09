import { client, server } from './decorators/environment';

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
            module: (comp) => {
                //do smth
            },
            args: [
                {'$ref': 'anotherServerComponent'}
            ]
        }
    },

    @server
    anotherServerComponent: {
        
    }
}

export default spec;
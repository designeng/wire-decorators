import _ from 'underscore';

let env = process.env.ENVIRONMENT;

export default function server(target, key, descriptor) {
    if (env === 'server') {
        
    }
}
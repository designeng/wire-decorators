import _ from 'underscore';
let env = process.env.ENVIRONMENT;

export default function client(target, key, descriptor) {
    if (env === 'server') {
        // TODO: is not it dangerous? Client components will be removed.

        delete target[key];
        return target = _.omit(target, key);

        // maybe:
        // target[key] = null;
        // END TODO
    }
}
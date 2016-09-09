import _ from 'underscore';
let env = process.env.ENVIRONMENT;

export default function client(target, key, descriptor) {
    if (env === 'server') {
        delete target[key];
        return target = _.omit(target, key);

        // TODO: Client components will be removed by previos code, but maybe better:
        // target[key] = null;
    }
}
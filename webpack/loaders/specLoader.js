var esprima = require('esprima');
const CLIENT = 'client';
const SERVER = 'server';
// const SERVER_REGEX = /@server((\s)|(\([\S\s]+\)))?/g;
const SERVER_REGEX = /@server(\s)/g;

var program = `
    var a = {
    serverComponent: {
        test : {
    },
}`;

module.exports = function specLoader(source) {
    var env = process.env.ENVIRONMENT;

    if(env === CLIENT) {

    }

    try {
        var ast = esprima.parse(program)
        console.log('AST:::', ast);
    } catch (e) {
        console.log('ERROR:::', e);
    }
    return source;
};
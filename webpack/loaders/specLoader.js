var esprima = require('esprima');
const CLIENT = 'client';
const SERVER = 'server';

// TODO: @server(...) match
// const SERVER_DECORATOR_REGEX = /@server((\s)|(\([\S\s]+\)))?/g;
// 
const SERVER_DECORATOR_REGEX = /@server(\s)/g;
const CLIENT_DECORATOR_REGEX = /@client(\s)/g;
const CLOSING_BRACKET_REGEX = /\}/g;

const getComponentName = (str) => {
    var colonPosition = str.indexOf(':');
    return str.slice(0, colonPosition).trim();
}

module.exports = function specLoader(source) {
    var env = process.env.ENVIRONMENT;

    var serverDecoratorMatches, 
        closingBracketMatches, 
        componentFragment, 
        componentSource,
        serverDecoratorPosition,
        lastBracketIncludedPosition,
        subSource,
        offset,
        program;

    if(env === CLIENT) {
        while(serverDecoratorMatches = SERVER_DECORATOR_REGEX.exec(source)) {
            offset = serverDecoratorMatches[0].length;
            
            // add `@server ` length to remove all server decorators from sub source string
            serverDecoratorPosition = serverDecoratorMatches.index + offset;
            subSource = source.slice(serverDecoratorPosition);

            while(closingBracketMatches = CLOSING_BRACKET_REGEX.exec(subSource)) {
                var lastBracketIncludedPosition = closingBracketMatches.index + 1;
                componentFragment = subSource.slice(0, lastBracketIncludedPosition);

                program = `var a = {${componentFragment}}`;
                
                try {
                    var ast = esprima.parse(program);
                    var componentName = getComponentName(componentFragment);
                    source = source.replace(componentFragment, `${componentName}: null`);
                } catch (e) {
                    continue;
                }
            }
        }
    }
    
    // remove all @server/@client decorators
    [SERVER_DECORATOR_REGEX, CLIENT_DECORATOR_REGEX].forEach((regex) => {
        source = source.replace(regex, '');
    });

    return source;
};
function CleanSpecPlugin() {}
module.exports = CleanSpecPlugin;

CleanSpecPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compilation", function(compilation) {
        // console.log('compilation....', compilation);
        compilation.plugin(["optimize-chunks-basic", "optimize-extracted-chunks-basic"], function(chunks) {
            // console.log('............');
            // console.log(chunks);
        });
    });
};
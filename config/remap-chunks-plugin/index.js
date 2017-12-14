var sourceMappingURL = require('source-map-url')

function TestPlugin (options) {
    this.options = extend({
        // from options
        apps: [
          { second: './apps/second-app#SecondAppMod' },
          { first: './apps/first-app#FirstAppMod' }
        ]
    }, options || {})
}

TestPlugin.prototype.apply = function (compiler) {
    var me = this

    compiler.plugin('make', function(compilation) {
        compilation._remapChunksPluginInstance = me;
    });
    // compiler.plugin('compilation', function (compilation) {
    //     compilation.plugin("after-optimize-chunks", function (chunks) {

    //         chunks.forEach( (chunk, idx) =>
    //         {
    //           // TODO: worth to investigate what is up with modules
    //           // now, with this logic, it gets common chunk as well
    //           if ( chunk.blocks.length && chunk.blocks.every( block => me.options.asyncBlocks.indexOf(block.loc) !== -1 ) )
    //           {
    //             // TODO: replace with some deplay server mapping logic from options
    //             const id = Math.random();
    //             chunk.name = id;
    //             chunk.id = 'http://localhost:3000/wtv/' + id;
    //           }  
    //         });
    //     })
    // })
}

function extend (base) {
    var i = 1
    var len = arguments.length

    for (; i < len; i++) {
        var obj = arguments[i]
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                base[key] = obj[key]
            }
        }
    }

    return base
}

module.exports = TestPlugin
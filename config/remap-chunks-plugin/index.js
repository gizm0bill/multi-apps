const webpack = require('webpack');
const basename = require('path').basename;
const AsyncDependenciesBlock = require('webpack/lib/AsyncDependenciesBlock');
const ContextElementDependency = require('webpack/lib/dependencies/ContextElementDependency');
const ImportDependency = require('webpack/lib/dependencies/ImportDependency');

class RemapChunksWebpackPlugin extends webpack.NamedChunksPlugin
{
  constructor(config)
  {
    let options = { processFn: () => void 0 };
    if ( typeof config === 'function' ) options.processFn = config;
    
    // Append a dot and number if the name already exists.
    const nameMap = new Map();
    const getUniqueName = (baseName) =>
    {
      let name = baseName, num = 0;
      while ( nameMap.has(name) ) name = `${baseName}.${num++}`;
      nameMap.set(name, true);
      return name;
    }

    const nameResolver = (chunk) =>
    {
      // entry chunks
      if ( chunk.name ) return chunk.name;

      console.log("\n");
      for (const c of chunk.getAllAsyncChunks()) {
        console.log("------>");
        console.log( c );
      }
      console.log("\n",);

      if // try to figure out if it's a lazy loaded route or import
      (
        false
        // chunkBlocks
        // && chunkBlocks.length > 0
        // && chunkBlocks[0] instanceof AsyncDependenciesBlock
        // && chunkBlocks[0].dependencies.length === 1
        // && (chunkBlocks[0].dependencies[0] instanceof ContextElementDependency
        //   || chunkBlocks[0].dependencies[0] instanceof ImportDependency)
      )
      {
        const
          req = chunkBlocks[0].dependencies[0].request,
          baseName = options.processFn(req);
        if ( !baseName ) return chunk.id;
        return getUniqueName(baseName);
      }
      return null;
    };

    super(nameResolver);
  }
}

module.exports = RemapChunksWebpackPlugin;
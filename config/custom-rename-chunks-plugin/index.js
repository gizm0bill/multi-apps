const webpack = require('webpack');
const basename = require('path').basename;
const AsyncDependenciesBlock = require('webpack/lib/AsyncDependenciesBlock');
const ContextElementDependency = require('webpack/lib/dependencies/ContextElementDependency');
const ImportDependency = require('webpack/lib/dependencies/ImportDependency');

/**
 * options.processFn( block.dependency.request )
 */
class CustomRenameChunksWebpackPlugin extends webpack.NamedChunksPlugin
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
      const group = chunk.groupsIterable.values().next().value;
      if ( !group ) return null;
      
      const block = group.blocksIterable.values().next().value;
      if // try to figure out if it's a lazy loaded route or import
      (
        block
        && block instanceof AsyncDependenciesBlock
        && block.dependencies.length === 1
        && (block.dependencies[0] instanceof ContextElementDependency
          || block.dependencies[0] instanceof ImportDependency)
      )
      {
        // console.log( block.dependencies[0] );
        const
          req = block.dependencies[0].request,
          baseName = options.processFn(req);
        if ( !baseName ) return chunk.id;
        return getUniqueName(baseName);
      }
      return null;
    };

    super(nameResolver);
  }
}

module.exports = CustomRenameChunksWebpackPlugin;
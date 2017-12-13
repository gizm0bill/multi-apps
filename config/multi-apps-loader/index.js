const LOADER_RE = /\/\/\s*DRP_LK_TS_HT/;
module.exports = function(source, map)
{
  let pos;
  if( ( pos = source.search(LOADER_RE) ) === -1 ) return source;

  let replacements = [];
  this._compilation._remapChunksPluginInstance.options.apps.forEach( (app) =>
    replacements.push( '{ path: "' + Object.keys(app)[0] + '", loadChildren: "' + Object.values(app)[0] + '"}' ) );
  
  console.log( source.replace( LOADER_RE, replacements.join(',') ) );
  return source.replace( LOADER_RE, replacements.join(',') );
}

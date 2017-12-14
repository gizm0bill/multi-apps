const ngtools = require('@ngtools/webpack');

const LOADER_RE = /\/\/\s*DRP_LK_TS_HT/;
module.exports = function(source, map)
{
  let pos;
  if( ( pos = source.search(LOADER_RE) ) === -1 ) return source;
  let replacements = [];
  [
    { second: './apps/second-app#SecondAppMod' },
    { first: './apps/first-app#FirstAppMod' }
  ].forEach( (app) =>
    replacements.push( "{ path: '" + Object.keys(app)[0] + "', loadChildren: '" + Object.values(app)[0] + "'}" ) );
  return source.replace( LOADER_RE, replacements.join(',') + "," ) ;
}

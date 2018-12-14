const createUtil = require('../util/createUtil');

module.exports = createResolver;

function createResolver(multicodec, NimObjClass, mapFromNimObject) {
  const util = createUtil(multicodec, NimObjClass);
  const resolver = {
    multicodec: multicodec,
    defaultHashAlg: 'blake2b-256',
    _resolveFromNimObject: resolveFromNimObject,
    _mapFromNimObject: mapFromNimObject
  };

  return {
    resolver: resolver,
    util: util
  };

  function resolveFromNimObject(nimObj, path, callback) {
    // root
    if (!path || path === '/') {
      const result = { value: nimObj, remainderPath: '' };
      return callback(null, result)
    }

    // check tree results
    mapFromNimObject(nimObj, {}, (err, paths) => {
      if (err) return callback(err);

      // parse path
      const pathParts = path.split('/');
      // find potential matches
      let matches = paths.filter((child) => child.path === path.slice(0, child.path.length));
      // only match whole path chunks
      matches = matches.filter((child) => child.path.split('/').every((part, index) => part === pathParts[index]));
      // take longest match
      const sortedMatches = matches.sort((a, b) => b.path.length - a.path.length);
      const treeResult = sortedMatches[0];

      if (!treeResult) {
        let err = new Error('Path not found ("' + path + '").');
        return callback(err);
      }

      // slice off remaining path (after match and following slash)
      const remainderPath = path.slice(treeResult.path.length + 1);

      const result = {
        value: treeResult.value,
        remainderPath: remainderPath
      };

      return callback(null, result);
    })
  }
}

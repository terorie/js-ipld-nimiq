const Nimiq = require('@nimiq/core');
const createResolver = require('../util/createResolver');

module.exports = createResolver('nim-interlink', Nimiq.BlockInterlink, mapFromNimObj);

function mapFromNimObj(nimObj, options, callback) {
  const paths = [];

  paths.push({
    path: 'hashes',
    value: nimObj.hashes()
  });

  callback(null, paths);
}

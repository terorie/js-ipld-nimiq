const Nimiq = require('@nimiq/core');
const cidFromHash = require('../util/cidFromHash');
const createResolver = require('../util/createResolver');

module.exports = createResolver('nimiq-block-header-v1', Nimiq.BlockHeader, (nimObj, options, callback) => {
  const paths = [];

  // external links
  paths.push({
    path: 'prev',
    value: { '/': cidFromHash('nim-block', nimObj.prevHash).toBaseEncodedString() }
  });
  paths.push({
    path: 'interlink',
    value: { '/': cidFromHash('nim-interlink', nimObj.interlinkHash).toBaseEncodedString() }
  });
  paths.push({
    path: 'body',
    value: { '/': cidFromHash('nim-body', nimObj.bodyHash).toBaseEncodedString() }
  });

  paths.push({
    path: 'prevHash',
    value: nimObj.prevHash
  });
  paths.push({
    path: 'interlinkHash',
    value: nimObj.interlinkHash
  });
  paths.push({
    path: 'bodyHash',
    value: nimObj.bodyHash
  });
  paths.push({
    path: 'accountsHash',
    value: nimObj.accountsHash
  });

  paths.push({
    path: 'nBits',
    value: nimObj.nBits
  });
  paths.push({
    path: 'height',
    value: nimObj.height
  });
  paths.push({
    path: 'timestamp',
    value: nimObj.timestamp
  });
  paths.push({
    path: 'nonce',
    value: nimObj.nonce
  });
  paths.push({
    path: 'version',
    value: nimObj.version
  });

  callback(null, paths);
});

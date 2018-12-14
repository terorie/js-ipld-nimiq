const CID = require('cids');
const multihashes = require('multihashes');

module.exports = cidFromHash;

function cidFromHash(codec, rawHash, options) {
    options = options || {};
    const hashAlg = options.hashAlg || 'blake2b-256';
    const version = typeof options.version === 'undefined' ? 1 : options.version;
    const multihash = multihashes.encode(rawHash, hashAlg);
    return new CID(version, codec, multihash);
}

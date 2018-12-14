const cidFromHash = require('./cidFromHash');

module.exports = cidFromNimObj;

function cidFromNimObj(multicodec, nimObj, options) {
    const hashBuffer = nimObj.hash();
    return cidFromHash(multicodec, hashBuffer, options);
}

const cidFromNimObj = require('./cidFromNimObj');
const asyncify = require('async/asyncify');

module.exports = createUtil;

function createUtil(multicodec, NimObjClass) {
  return {
    deserialize: asyncify((serialized) => NimObjClass.unserialize(serialized)),
    serialize: asyncify((ethObj) => ethObj.serialize()),
    cid: asyncify((ethObj, options) => cidFromNimObj(multicodec, ethObj, options))
  };
}

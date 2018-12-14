const Nimiq = require('@nimiq/core');
const createResolver = require('../util/createResolver');

module.exports = createResolver('nim-body', Nimiq.BlockBody, mapFromNimObj);

function mapFromNimObj(nimObj, options, callback) {
  const paths = [];

  if (nimObj.extraData) {
    paths.push({
      path: 'extraData',
      value: nimObj.extraData
    })
  }

  paths.push({
    path: 'minerAddr',
    value: nimObj.minerAddr
  });

  // List of transactions
  const txPath = nimObj.transactions.map((tx) => {
    const paths = [];

    if (tx.format === Nimiq.Transaction.Format.BASIC) {
      paths.push({
        path: 'senderPubKey',
        value: tx.senderPubKey.serialize()
      });
    }

    paths.push({
      path: 'format',
      value: tx.format
    });
    paths.push({
      path: 'sender',
      value: tx.sender.serialize()
    });
    paths.push({
      path: 'senderType',
      value: tx.senderType
    });
    paths.push({
      path: 'recipient',
      value: tx.sender.serialize()
    });
    paths.push({
      path: 'recipientType',
      value: tx.senderType
    });
    paths.push({
      path: 'value',
      value: tx.value
    });
    paths.push({
      path: 'fee',
      value: tx.fee
    });
    paths.push({
      path: 'networkId',
      value: tx.networkId
    });
    paths.push({
      path: 'validityStartHeight',
      value: tx.validityStartHeight
    });
    paths.push({
      path: 'flags',
      value: tx.flags
    });
    paths.push({
      path: 'data',
      value: tx.data
    });

    if (tx.proof) {
      paths.push({
        path: 'proof',
        value: tx.proof
      });
    }

    return paths;
  });

  paths.push({
    path: 'transactions',
    value: txPath
  });

  // List of pruned accounts
  const pruned = nimObj.prunedAccounts.map((acc) => {
    const paths = [];

    paths.push({
      path: 'address',
      value: acc.address
    });
    paths.push({
      path: 'type',
      value: acc.account.type
    });
    paths.push({
      path: 'balance',
      value: acc.account.balance
    });

    return paths;
  });

  paths.push({
    path: 'prunedAccounts',
    value: pruned
  });

  callback(null, paths);
}

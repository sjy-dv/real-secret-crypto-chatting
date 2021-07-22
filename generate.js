const NodeRSA = require("node-rsa");

const key = new NodeRSA({ b: 512 });

key.generateKeyPair(512, 30);
console.log(key);

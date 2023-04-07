const crypto = require('crypto');

// generate a random 32 byte string
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey);
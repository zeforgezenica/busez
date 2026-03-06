const NodeCache = require("node-cache");

// TTL = Time To Live (koliko dugo podaci ostaju u cache-u)
// stdTTL: 300 = podaci se brišu nakon 5 minuta
const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60, // provjera expired ključeva svake minute
});

module.exports = cache;

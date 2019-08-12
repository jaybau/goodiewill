const { Pool, Client } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'goodiewill',
  database: 'goodies',
  password: ''
});

const client = new Client({
  host: 'localhost',
  user: 'goodiewill',
  database: 'goodies',
  password: ''
});

client
  .connect()
  .then(() => console.log('PG CONNECTED'))
  .catch((err) => console.log('PG CONNECTION ERROR: ', err.stack));

module.exports = pool;
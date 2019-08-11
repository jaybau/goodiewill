const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'goodiewill',
  database: 'goodies',
  password: ''
})

module.exports = pool;
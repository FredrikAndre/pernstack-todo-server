const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  database: process.env.DATABASE,
  port: 5432,
})

module.exports = pool

const enviorment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const enviormentConfig = config[enviorment];
const knex = require('knex');
const connection = knex(enviormentConfig);

module.exports = connection;
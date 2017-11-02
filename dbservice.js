

const environment = process.env.NODE_ENV || 'development';
const config = require('./dbconfig.js');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);

module.exports = connection;

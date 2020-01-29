const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'mymoney',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
  },
  test: {  
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'mymoney_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: Sequelize.Op
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
const Sequelize = require('sequelize');
const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(connection);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
}

module.exports = sequelize;
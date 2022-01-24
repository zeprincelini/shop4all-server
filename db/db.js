const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shop4all_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;

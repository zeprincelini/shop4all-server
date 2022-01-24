const Sequelize = require("sequelize");
const db_sequelize = require("../db/db");

const User = db_sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // verified: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false,
  // },
});

module.exports = User;

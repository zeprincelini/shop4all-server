const Sequelize = require("sequelize");
const db_sequelize = require("../db/db");

const Order = db_sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Order;

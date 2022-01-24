const db = require("./db");
const User = require("../models/user");
const Order = require("../models/order");

User.hasMany(Order);

const syncDb = async () => {
  try {
    const res = await db.sync();
    if (res) {
      console.log("table(s) created");
    } else {
      console.log("error creating tables");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = syncDb;

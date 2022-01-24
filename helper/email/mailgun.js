const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports = mailgunClient;

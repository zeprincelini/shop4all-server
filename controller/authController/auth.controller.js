const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//model imports
const User = require("../../models/user");
//scripts imports
const resetTemplate = require("../../helper/email/resetPassword");
const mailgunClient = require("../../helper/email/mailgun");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      return res.status(403).json("error creating account");
    } else {
      const newUser = {
        name,
        email,
        password: hash,
      };
      const user = await User.create(newUser);
      if (!user) {
        return res.status("401").json({ error: "Registration failed" });
      }
      return res.status("200").json({
        status: "success",
        data: user,
        message: "Registration successful",
      });
    }
  } catch (err) {
    return res.status(403).json(err.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "email/password incorrect" });
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ error: "email/password incorrect" });
      } else {
        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "48h" }
        );
        return res.status(200).json({
          status: "success",
          message: "login successful",
          data: {
            name: user.name,
            email: user.email,
            accessToken: token,
          },
        });
      }
    }
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(403).json({ error: "email incorrect" });
    } else {
      const mail_data = {
        from: process.env.MAIL_ADDRESS,
        to: email,
        subject: "Reset Password",
        html: resetTemplate,
      };
      try {
        await mailgunClient.messages.create(
          process.env.MAILGUN_DOMAIN,
          mail_data
        );
        return res.status(200).json({
          status: "success",
          message: "email sent",
        });
      } catch (err) {
        return res.status(401).json({ error: err.message });
      }
    }
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};

const router = require("express").Router();
const controller = require("../../controller/authController/auth.controller");
const mailList = require("../../helper/email/mailList");

router.post("/sign-up", controller.createUser);
router.post("/sign-in", controller.loginUser);
router.post("/forgot/password/:email", controller.forgotPassword);
router.post("/newsletter/subscribe", mailList);

module.exports = router;

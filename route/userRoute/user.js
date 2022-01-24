const router = require("express").Router();
const controller = require("../../controller/authController/auth.controller");

router.post("/sign-up", controller.createUser);
router.post("/sign-in", controller.loginUser);

module.exports = router;

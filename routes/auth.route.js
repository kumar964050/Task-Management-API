const router = require("express").Router();

const controller = require("../controllers/auth.controller");

router.route("/login").post(controller.login);

module.exports = router;

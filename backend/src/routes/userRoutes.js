const express = require("express");
const { UserSignup, UserLogin } = require("../controllers/userAuth");

const router = express.Router();

router.post("/signup", UserSignup);
router.post("/login", UserLogin);

module.exports = router;

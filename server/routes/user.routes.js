const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { dbGetUser } = require("../controllers/user.controller");

router.post("/user/check/registration/authorization", dbGetUser);
router.post("/user/create", authCheck, dbGetUser);
router.post("/user/login", authCheck, dbGetUser);
router.post("/user/get", authCheck, dbGetUser);


module.exports = router;
const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { verifyUser, updateSession, loginUser, dbCreateUser, dbGetUser, dbCheckRegistrationAuthorization } = require("../controllers/user.controller");

router.post("/user/check/registration/authorization", dbCheckRegistrationAuthorization);
router.post("/user/create", authCheck, dbCreateUser);
router.get("/user/verify", verifyUser);
router.get("/user/session/update", authCheck, updateSession);
router.post("/user/login", authCheck, loginUser);
router.post("/user/get", authCheck, dbGetUser);


module.exports = router;
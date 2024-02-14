const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { getAccounts, addAccount } = require('../controllers/account.controller');

router.get("/get/accounts", authCheck, getAccounts);
router.post("/add/account", authCheck, addAccount);

module.exports = router;


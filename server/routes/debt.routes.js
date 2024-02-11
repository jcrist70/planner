const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { addDebt } = require('../controllers/debt.controller');

router.post("/add/debt", authCheck, addDebt);

module.exports = router;

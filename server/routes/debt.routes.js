const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { getDebts, addDebt } = require('../controllers/debt.controller');

router.get("/get/debts", authCheck, getDebts);
router.post("/add/debt", authCheck, addDebt);

module.exports = router;

const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { getCredits, addCredit } = require('../controllers/credit.controller');

router.get("/get/credits", authCheck, getCredits);
router.post("/add/credit", authCheck, addCredit);

module.exports = router;

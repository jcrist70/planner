const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { updateYear, updateMonth, updateWeek, getDay, updateDay } = require('../controllers/calendar.controller');


router.post("/update/year", authCheck, updateYear);
router.post("/update/month", authCheck, updateMonth);
router.post("/update/week", authCheck, updateWeek);
router.post("/get/day", getDay);
router.post("/update/day", updateDay);


module.exports = router;
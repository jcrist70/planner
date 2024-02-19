const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { getYear, updateYear, getMonth, updateMonth, getWeek, updateWeek, getDay, updateDay } = require('../controllers/calendar.controller');


router.post("/get/year", getYear);
router.post("/update/year", updateYear);
router.post("/get/month", getMonth);
router.post("/update/month", updateMonth);
router.post("/get/week", getWeek);
router.post("/update/week", updateWeek);
router.post("/get/day", getDay);
router.post("/update/day", updateDay);


module.exports = router;
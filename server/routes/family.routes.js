const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth.middleware");
const { getFamily } = require('../controllers/family.controller');


router.get("/get/family", authCheck, getFamily);


module.exports = router;
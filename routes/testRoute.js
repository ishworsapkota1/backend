const express = require("express");
const { testFunction } = require("../controller/testFunction");
const router = express.Router();

router.get("/test", testFunction);

module.exports = router;

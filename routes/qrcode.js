const express = require('express');
const router = express.Router();
const { FamiCodes } = require('../db/db2');

/* GET home page. */
router.get('/', function(req, res, next) {
  (async () => {
    const data = await FamiCodes.getCode()
    res.send({
      success: true,
      data,
    });
  })();
});

module.exports = router;

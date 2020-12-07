const express = require('express');
const router = express.Router();
const { FamiCodes } = require('../db/db2');

/* GET home page. */
router.post('/', function(req, res, next) {
  (async () => {
    const data = await FamiCodes.getCode(req.body);
    res.send({
      success: true,
      data,
    });
  })();
});

module.exports = router;

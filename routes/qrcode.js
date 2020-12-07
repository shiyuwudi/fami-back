const express = require('express');
const router = express.Router();
const { FamiCodes } = require('../db/db2');

/* GET home page. */
router.get('/', function(req, res, next) {
  (async () => {
    console.log(111);
    const data = await FamiCodes.getCode();
    console.log(222, data);
    res.send({
      success: true,
      data,
    });
  })();
});

module.exports = router;

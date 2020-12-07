const express = require('express');
const router = express.Router();
const { FamiCodes } = require('../db/db2');

/* GET home page. */
router.post('/', function(req, res, next) {
  (async () => {
    const {
      serverData,
      newState,
      openid,
    } = req.body;
    res.send({
      body: req.body,

    });
    // const resp = await searchPage(keyword, 1);
    // const { numPages, result } = resp.data.data;
    // if (numPages > 1) {
    //   for (let i = 2; i < numPages; i++) {
    //     const resp1 = await searchPage(keyword, i);
    //     for (let j = 0; j < resp1.data.data.result.length; j++) {
    //       result.push(resp1.data.data.result[j]);
    //     }
    //   }
    //   res.send(resp.data);
    // } else {
    //   res.send(resp.data);
    // }
  })();
});

module.exports = router;

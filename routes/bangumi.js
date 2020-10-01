const express = require('express');
const router = express.Router();
const axios = require('axios');

async function searchPage (keyword, page) {
  return await axios.get('https://api.bilibili.com/x/web-interface/search/type', {
    params: {
      search_type: 'media_bangumi',
      page,
      keyword,
      __refresh__: true,
      highlight: 1,
      single_column: 0,
    }
  });
}

/* GET home page. */
router.get('/search', function(req, res, next) {
  (async () => {
    const keyword = req.query.keyword;
    const resp = await searchPage(keyword, 1);
    const { numPages, result } = resp.data.data;
    if (numPages > 1) {
      for (let i = 2; i < numPages; i++) {
        const resp1 = await searchPage(keyword, i);
        for (let j = 0; j < resp1.data.data.result.length; j++) {
          result.push(resp1.data.data.result[j]);
        }
      }
      res.send(resp.data);
    } else {
      res.send(resp.data);
    }
  })();
});

module.exports = router;

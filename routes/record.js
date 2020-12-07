const express = require('express');
const router = express.Router();
const { UserAction } = require('../db/db2');

const sampleBody  = {
  "serverData": {
    "media_id": 28229301,
    "season_id": 33868,
    "type": "media_bangumi",
    "title": "弩級戰隊<em class=\"keyword\">H</em>×EROS（僅限港澳台地區）",
    "org_title": "ド級編隊エグゼロス",
    "cover": "//i0.hdslb.com/bfs/bangumi/image/8a6a4f4652bc8071783e1096d1ddc94e40f2f919.png",
    "media_type": 1,
    "areas": "日本",
    "styles": "漫画改/战斗/架空",
    "cv": "炎城烈人:松岡禎丞\n星乃雲母:加隈亜衣\n桃園百花:矢作紗友裏\n天空寺宙:桑原由気\n白雪舞姫:茅野愛衣",
    "staff": "導演:神保昌登\n原作:きただりょうま\n系列構成:神保昌登\n色彩設計:鈴木ようこ\n剪輯:近藤勇二\n音樂:吟\n音響監督: 土屋雅紀\n音響: スタジオマウス\n動畫制作: project No.9\nCG 導演: 濱村敏郎",
    "play_state": 0,
    "goto_url": "https://www.bilibili.com/bangumi/play/ss33868/",
    "desc": "地球因迷之侵略者·外星人規制蟲而面臨巨大的危機。規制蟲通過吸取人們的H能源來奪走人類生存所需的能量。\n為了從規制蟲手中拯救地球，高中生炎城烈人加入守護地球的戰隊「HXEROS」來保衛地球擊退規制蟲——。",
    "corner": 2,
    "pubtime": 1593792000,
    "media_mode": 2,
    "is_avid": false,
    "fix_pubtime_str": "",
    "media_score": {
      "user_count": 740,
      "score": 9.2
    },
    "hit_columns": [
      "title"
    ],
    "all_net_name": "",
    "all_net_icon": "",
    "all_net_url": "",
    "angle_title": "",
    "angle_color": 0,
    "display_info": [],
    "hit_epids": "",
    "pgc_season_id": 33868,
    "season_type": 1,
    "season_type_name": "番剧",
    "selection_style": "grid",
    "ep_size": 12,
    "url": "https://www.bilibili.com/bangumi/play/ss33868",
    "button_text": "立即观看",
    "is_follow": 0,
    "is_selection": 1,
    "eps": [{
        "id": 330503,
        "cover": "http://i0.hdslb.com/bfs/archive/7b6a91b86aaf6196c0eeec2d37f4383dd6a17c5a.jpg",
        "title": "1",
        "url": "https://www.bilibili.com/bangumi/play/ep330503",
        "release_date": "",
        "badges": [],
        "index_title": "1",
        "long_title": "在這光明普照的世界"
    }],
    "badges": []
  },
  "newState": "在看",
  "openid": "oxzgx5TxRHAOjHZQgxpUQXVVejBQ"
}

/* GET home page. */
router.post('/state', function(req, res, next) {
  (async () => {
    const {
      serverData,
      newState,
      openid,
    } = req.body;
    const title = serverData.title && serverData.title.replace(/<em.*?>|<\/em>/g, '');
    await UserAction.record({
      openid,
      action: `将${title}标记为${newState}`,
    })
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

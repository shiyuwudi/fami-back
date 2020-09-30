//引入框架
var Sequelize = require('sequelize');
//初始化链接（支持连接池）
var sequelize = new Sequelize('bili_record', 'root', 'iltxy1314',  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});


//定义数据模型
var User = sequelize.define('user', {
    // session_key = "F8L0trTTt/VJVSWHYzD3sg==" 访问需要用户信息的接口时需要用？
    // openid = "oxzgx5TxRHAOjHZQgxpUQXVVejBQ" 用户唯一标识
    session_key: Sequelize.STRING,
    openid: Sequelize.STRING,
    last_login: Sequelize.DATE,
});

module.exports = {
    sequelize,
    User,
};


return;
const id = Date.now();
//初始化数据
sequelize.sync().then(function() {
    return User.create({
        session_key: 'session_key' + id,
        openid: 'openid' + id,
        last_login: new Date(1980, 6, 20)
    });
}).then(function(jane) {
    // //获取数据
    // console.log(jane.get({
    //     plain: true
    // }));
    (async () => {
        const r = await User.findOne({
            where: {
                openid: 'openid' + id,
            }
        });
        console.log('r', r);
        r.session_key = '666';
        await r.save();
        const r1 = await User.findOne({
            where: {
                openid: 'openid' + id,
            }
        });
        console.log('r1', r1);
    })();

}).catch(function (err) {
    //异常捕获
    console.log('Unable to connect to the database:', err);
});

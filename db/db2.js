// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'animes',
});

async function q (sql) {
    return new Promise((resolve, reject) => {
        console.log(sql);
        connection.query(
            sql,
            function(err, results, fields) {
                if (err) {
                    return reject(err);
                }
                console.log(results);
                console.log(fields); // fields contains extra meta data about results, if available
                resolve(results); // results contains rows returned by server
            }
        );
    });
}

const User = {
    table_name: 'user',
    getByOpenId: async function (openId) {
        return await q(`select * from ${this.table_name} where openid='${openId}'`);
    },
    create: async function (openid) {
        return await q(`insert into ${this.table_name} (openid, create_date, last_login_date) values('${openid}', NOW(), NOW())`)
    },
    updateLastLogin: async function (data, fields) {
        return await q(`update ${this.table_name} set last_login_date=NOW() where id='${data.id}'`);
    },

};

const UserAction = {
    table_name: 'user_action',
    record: async function ({openid, action}) {
        // 记录用户a在b时间操作了c
        return await q(`insert into ${this.table_name} (openid, create_date, action) values('${openid}', NOW(), ${action})`);
    },
};

function initTables () {
    // 用户
    const createTableSql1 = `
        CREATE TABLE IF NOT EXISTS user(
           id INT UNSIGNED AUTO_INCREMENT,
           openid VARCHAR(100) NOT NULL,
           create_date DATETIME,
           last_login_date DATETIME,
           PRIMARY KEY ( id )
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;
    connection.query(
        createTableSql1,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    )
    // 操作记录
    const createTableSql2 = `
        CREATE TABLE IF NOT EXISTS user_action(
           id INT UNSIGNED AUTO_INCREMENT,
           openid VARCHAR(100) NOT NULL,
           create_date DATETIME,
           action VARCHAR(100) NOT NULL,
           PRIMARY KEY ( id )
        )ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;
    connection.query(
        createTableSql2,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    )
}

module.exports = {
    initTables,
    User,
    UserAction,
};


// const insertSql1 = `
// insert into runoob_tbl
// (runoob_title, runoob_author, submission_date)
// VALUES
// ("学习 PHP", "菜鸟教程", NOW())
// `;
//
// connection.query(
//     insertSql1,
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//
//     }
// )


// simple query
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );
//
// // with placeholder
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function(err, results) {
//         console.log(results);
//     }
// );

module.exports = {
    apps : [
        {
            name: "bili-back",
            script: "./bin/www",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "PORT": "80"
            }
        }
    ]
}

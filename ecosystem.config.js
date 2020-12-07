module.exports = {
    apps : [
        {
            name: "fami-back",
            script: "./bin/www",
            watch: true,
            env: {
                "NODE_ENV": "development",
                "PORT": "8080"
            }
        }
    ]
}

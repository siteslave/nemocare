App.factory('Common', function ($q) {

    var config = jf.readFileSync(CONFIG_FILE);

    return {
        getConnection: function () {

            return require('knex')({
                client: 'mysql',
                connection: {
                    host     : config.db.host,
                    user     : config.db.user,
                    password : config.db.password,
                    database : config.db.database,
                    charset: 'utf8'
                },
                pool: {
                    min: 0,
                    max: 1000
                }
            });
        },
        getApiUrl: function () {
            return config.apiUrl;
        },

        getAllSettings: function () {
            return config;
        }
    };
});
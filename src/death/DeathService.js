App.factory('DeathService', function ($q) {

    return {

        count: function () {

            var q = $q.defer();

            knex('accident')
                .count('* as total')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        }

    };

});
App.factory('DeathService', function ($q, $http) {

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
        },
        
        all: function () {

            var  q = $q.defer();

            knex('accident')
                //.select()
                //.where()
                //.orderBy()
                //.groupBy()
                .limit(10)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        total: function () {
            var q = $q.defer();

            knex('accident as a')
                .select('h.hospcode', 'h.name', 'h.hosptype', knex.raw('count(*) as total'))
                .leftJoin('hospcode as h', 'h.hospcode', 'a.hospcode')
                .whereIn('h.hospital_type_id', [6, 7, 8])
                .where('h.chwpart', '45')
                .groupBy('a.hospcode')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        detail: function(hospcode) {

            var  q = $q.defer();

            knex('accident')
                .where('hospcode', hospcode)
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        getService: function (hospcode) {

            var q = $q.defer();

            var options = {
                url: apiUrl + '/death/detail',
                method: 'POST',
                data: {
                    hospcode: hospcode
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    console.log(status);
                    q.reject('Network error');
                });

            return q.promise;
        }


    };

});
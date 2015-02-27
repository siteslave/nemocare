/**
 * Main Service
 */
App.factory('MainService', function ($q, $http, Common) {

    var apiUrl = Common.getApiUrl();

    return {

        all: function () {
            var q = $q.defer();
            // HTTP options
            var options = {
                url: apiUrl + '/products/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    // success
                })
                .error(function (data, status) {
                    // error
                });

            // return promise
        }

    };

});
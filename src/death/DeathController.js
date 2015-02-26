
App.controller('DeathController', function ($scope, DeathService) {

    $scope.total = 0;

    DeathService.count()
        .then(function (rows) {
            //console.log(rows);
            $scope.total = rows[0].total;
        }, function (err) {
            console.log(err);
        });

});
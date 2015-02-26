
App.controller('DetailController', function ($scope, $routeParams, DeathService) {

    var hospcode = $routeParams.hospcode;
    $scope.person = null;

    DeathService.detail(hospcode)
        .then(function (rows) {
            $scope.person = rows;
        }, function (err) {
            console.log(err);
        });




});
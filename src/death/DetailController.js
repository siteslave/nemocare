
App.controller('DetailController', function ($scope, $routeParams, DeathService, LxProgressService, LxNotificationService) {

    var hospcode = $routeParams.hospcode;
    $scope.person = null;
    // Hide data
    $scope.success = false;
    // Start progress bar
    LxProgressService.linear.show('#5fa2db', '#progress');

    DeathService.detail(hospcode)
        .then(function (rows) {
            $scope.person = rows;
            LxProgressService.linear.hide();
            $scope.success = true;
        }, function (err) {
            LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
            console.log(err);
        });

});
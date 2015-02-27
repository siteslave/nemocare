
App.controller('DeathController', function ($scope, DeathService, LxNotificationService, LxDialogService) {

    $scope.total = 0;

    $scope.person = null;
    $scope.hospitals = null;

    $scope.getService = function (hospcode) {

        DeathService.getService(hospcode)
            .then(function (data) {
                if (data.ok) {
                    $scope.items = data.rows;
                    LxDialogService.open('mdlDetail');
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                    LxNotificationService.error('เกิดข้อผิดพลาด');
                }
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด');
            });

    };

    $scope.chartConfig = {

        options: {
            chart: {
                type: 'column'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        series: [{
            name: 'จำนวนผู้เสียชีวิต',
            data: []
        }],
        title: {
            text: 'ทะเบียนผู้เสียชีวิต'
        },
        loading: false,
        xAxis: {
            categories: [],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px'
                }
            }
        },
        //xAxis: {
        //    currentMin: 0,
        //    currentMax: 20,
        //    title: {text: 'values'}
        //},
        useHighStocks: false
    };

    DeathService.total()
        .then(function (rows) {
            $scope.hospitals = rows;

            _.forEach(rows, function (v) {
                $scope.chartConfig.xAxis.categories.push(v.name);
                $scope.chartConfig.series[0].data.push(v.total);
            });

        }, function (err) {
            console.log(err);
            LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
        });


});
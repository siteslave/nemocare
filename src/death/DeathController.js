
App.controller('DeathController', function ($scope, DeathService, LxNotificationService, LxDialogService, LxProgressService) {

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
                    padding: 10
                },
                pointFormat: 'เสียชีวิต: <b>{point.y}</b> คน'
            }
        },
        series: [{
            name: 'จำนวนผู้เสียชีวิต',
            data: []
        }],
        title: {
            text: 'ทะเบียนผู้เสียชีวิต'
        },
        subtitle: {
            text: 'Source: โปรแกรม Nemo'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            categories: [],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px'
                }
            }
        },
        yAxis: {
            title: {
                text: 'คน'
            },
            min: 0
        },
        useHighStocks: false
    };

    $scope.success = false; // Hide data
    // Start progress bar
    LxProgressService.linear.show('#5fa2db', '#progress');

    DeathService.total()
        .then(function (rows) {
            $scope.hospitals = rows;

            _.forEach(rows, function (v) {
                $scope.chartConfig.xAxis.categories.push(v.name);
                $scope.chartConfig.series[0].data.push(v.total);
            });
            // Hide progress
            LxProgressService.linear.hide();
            // Show data
            $scope.success = true;
        }, function (err) {
            console.log(err);
            LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
        });


});
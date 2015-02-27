App.controller('ToolbarController', function ($scope, LxNotificationService) {
    $scope.openDebug = function () {
        win.showDevTools();
    };

    $scope.doExit = function () {
        LxNotificationService.confirm('ยืนยัน', 'คุณต้องการออกจากโปรแกรม ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการออกจากโปรแกรม',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                gui.App.quit();
            }
        });
    };
});
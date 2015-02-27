/**
 * Setting Controller
 */
App.controller('SettingController', function ($scope, Common, LxNotificationService) {

    var allSetting = Common.getAllSettings();

    $scope.config = allSetting;

    $scope.doSave = function () {
        jf.writeFile(CONFIG_FILE, $scope.config, function (err) {
           if (err) {
               console.log(err);
               LxNotificationService.error('ไม่สามารถบันทึกไฟล์ได้ กรุณาดู log');
           } else {
               LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
           }
        });
    };

});
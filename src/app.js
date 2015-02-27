/**
 * Main application module
 */
var moment = require('moment'),
    _ = require('lodash'),
    jf = require('jsonfile'),
    path = require('path'),
    fs = require('fs'),
    gui = require('nw.gui'),
    win = gui.Window.get();

// Constant
var APP_PATH = gui.App.dataPath,
    CONFIG_FILE = path.join(APP_PATH, 'config.json');

// Main application module
var App = angular.module('App', ['lumx', 'ngRoute', 'highcharts-ng']);
// API url

if(!fs.existsSync(CONFIG_FILE)) {
    var defaultConfig = {
        db: {
            host: '127.0.0.1',
            port: 3306,
            database: 'nemocare',
            user: 'test',
            password: 'test'
        },
        apiUrl: 'http://localhost:3000',
        key: '123456'
    };

    // Create config.json file
    jf.writeFileSync(CONFIG_FILE, defaultConfig);
}

// App configuration
App.config(function ($routeProvider) {

    // Configure routing
    $routeProvider
        .when('/', { // http://localhost/index.php#/
            templateUrl: 'partials/Main.html',
            controller: 'MainController'
        })
        .when('/settings', {
            templateUrl: 'partials/Settings.html',
            controller: 'SettingController'
        })
        .when('/death', {
            templateUrl: 'partials/death/Death.html',
            controller: 'DeathController'
        })
        .when('/death/:hospcode', {
            templateUrl: 'partials/death/DeathDetail.html',
            controller: 'DetailController'
        })
        .otherwise({ redirectTo: '/' });
});

//Show window when ready
onload = function () {
    win.show();
};

// When window is minimize
win.on('minimize', function () {
    var tray = new gui.Tray({title: 'Nemo'});
    var menu = new gui.Menu();
    var that = this;

    menu.append(new gui.MenuItem({
        type: 'normal',
        label: 'เปิดหน้าต่าง',
        icon: 'img/icon.png',
        click: function () {
            that.show();
            tray.remove();
            tray = null;
        }
    }));

    tray.menu = menu;
    // hide window
    that.hide();

});
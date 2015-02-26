 /**
 * Application module
 */
var moment = require('moment');
// Main application module
var App = angular.module('App', ['lumx', 'ngRoute', 'highcharts-ng']);
// API url
var apiUrl = 'http://localhost:3000';

 var knex = require('knex')({
     client: 'mysql',
     connection: {
         host     : 'hdc101.selfip.net',
         user     : 'root',
         password : 'Hos1106411064',
         database : 'nemocare',
         charset: 'utf8'
     }
 });

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
            templateUrl: 'partials/Death.html',
            controller: 'DeathController'
        })
        .when('/death/:hospcode', {
            templateUrl: 'partials/DeathDetail.html',
            controller: 'DetailController'
        })
        .otherwise({ redirectTo: '/' });
});
 /**
 * Application module
 */
// Main application module
var App = angular.module('App', ['lumx', 'ngRoute']);
// API url
var apiUrl = 'http://localhost:3000';

 var knex = require('knex')({
     client: 'mysql',
     connection: {
         host     : 'hdc101.selfip.net',
         user     : 'nut101',
         password : 'nut101',
         database : 'nemo'
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
        .otherwise({ redirectTo: '/' });
});
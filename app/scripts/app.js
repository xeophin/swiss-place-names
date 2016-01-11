'use strict';

/**
 * @ngdoc overview
 * @name swissnamesApp
 * @description
 * # swissnamesApp
 *
 * Main module of the application.
 */
angular
  .module('swissnamesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });

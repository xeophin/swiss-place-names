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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          places: function(placeNamesService){
            return placeNamesService.getPlaceNames();
          },
          suffixes: function(suffixService){
            return suffixService.getSuffixes();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });

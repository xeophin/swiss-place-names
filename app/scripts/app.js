(function (angular) {
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
    .config(function ($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController',
          controllerAs: 'main',
          resolve: {
            places: loadPlaces,
            suffixes: loadSuffixes
          }
        })
        .otherwise({
          redirectTo: '/'
        });

      function loadSuffixes(suffixService) {
        return suffixService.getSuffixes();
      }

      function loadPlaces(placeNamesService) {
        return placeNamesService.getPlaceNames();
      }

      $locationProvider.html5Mode(true);

    });
})(angular);

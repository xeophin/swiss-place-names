(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name swissnamesApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the swissnamesApp
   */
  angular.module('swissnamesApp')
    .controller('MainController', MainController);

  function MainController(places, suffixes) {
    var main = this;
    main.places = d3.csv.parse(places);
    main.suffixes = suffixes;

  }
})();

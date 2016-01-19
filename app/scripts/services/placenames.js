(function (d3, angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name swissnamesApp.placeNames
   * @description
   * # placeNames
   * Service in the swissnamesApp.
   */
  angular.module('swissnamesApp')
    .service('placeNamesService', placeNames);

  function placeNames($http, $q) {
    var service = {
      getPlaceNames: getPlaceNames,
      d3list: list
    };

    return service;

    //////////////////////////////

    var list;

    function getPlaceNames() {
      if (angular.isDefined(list)) {
        return $q.when(list);
      }

     return $http.get('data/visualisationList.csv', {cache: true})
          .then(getPlaceNamesComplete)
          .catch(getPlaceNamesFailed);

      function getPlaceNamesComplete(response) {
        list = d3.csv.parse(response.data);
        return list;
      }

      function getPlaceNamesFailed(error) {
        console.error(error);
      }
    }
  }

})
(d3, angular);

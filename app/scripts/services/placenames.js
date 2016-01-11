(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name swissnamesApp.placeNames
   * @description
   * # placeNames
   * Service in the swissnamesApp.
   */
  angular.module('swissnamesApp')
    .service('placeNames', placeNames);

  function placeNames($http) {
    return {getPlaceNames: getPlaceNames};

    function getPlaceNames() {
      return $http.get('data/visualisationList.csv')
        .then(getPlaceNamesComplete)
        .catch(getPlaceNamesFailed);

      function getPlaceNamesComplete(response){
        return response.data;
      }

      function getPlaceNamesFailed(error) {
        console.error(error);
      }
    }
  };

})
();

(function() {
  
  angular
    .module('AdManager')
    .controller('listController', listController);

  listController.$inject = ['$location', '$scope', '$http'];
  function listController($location, $scope, $http) {
    //Get list of all users
    $scope.list = function() {
      $http.get('http://localhost:9000/api/publications').then(function (response) {
          $scope.publications = response.data.publications;
          console.log($scope.publications);
      });            
    };
  }

})();
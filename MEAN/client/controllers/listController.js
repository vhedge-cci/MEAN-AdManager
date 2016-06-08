(function() {
  
  angular
    .module('AdManager')
    .controller('listController', listController);

  listController.$inject = ['$location', '$scope', '$http'];
  function listController($location, $scope, $http) {
    //Get list of all users
    $scope.list = function() {
      $http.get('/api/publications').then(function (response) {
          $scope.publications = response.data.publications;
          console.log($scope.publications);
      });            
    };

    $scope.delete = function (index) {
      console.log(index);
      var publicationID = $scope.publications[index]._id;
      $http.delete('/api/publications/'+publicationID).then(function (response) {
        $scope.publications.splice(index,1);
      });
    }
  }

})();
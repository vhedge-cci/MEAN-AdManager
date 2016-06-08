//........... addController
(function () {
  angular
  .module('AdManager')
  .controller('addController', addController);

  addController.$inject = ['$scope', '$routeParams', '$http', '$location'];
  function addController($scope, $routeParams, $http, $location) {

    //to add the values
    $scope.addNote = function() {
        //console.log($scope.publication.name, $scope.publication.email, $scope.publication._id);
        var data = {
            publicationName: $scope.publicationName,
            publicationType: $scope.publicationType,
            publicationLanguage: $scope.publicationLanguage,
            commissionRateForAdvertisments: $scope.commissionRateForAdvertisments,
            commisionRateForClassifieds: $scope.commisionRateForClassifieds,
            isActiveRecord: 1
        };
        console.log(data);               
        $http.post('/api/publications', {data:data}).then(function (response) {
            //$scope.datas = response.data;
            //console.log(response.data);
            $location.path('/list')
        });            
    };

  }

})();    
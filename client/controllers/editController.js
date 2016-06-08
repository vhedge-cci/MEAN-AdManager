//........... editController
(function () {
  angular
  .module('AdManager')
  .controller('editController', editController);

  editController.$inject = ['$scope', '$routeParams', '$http', '$location', 'authentication'];
  function editController($scope, $routeParams, $http, $location) {

    var noteId = $routeParams.id;
    $http.get('/api/publications/'+noteId).then(function (response) {
            $scope.publication = response.data.publication;
            //console.log($scope.publication);
            //$location.path('/edit')
    });

    //to update the values
    $scope.updateNote = function() {
        //console.log($scope.publication.name, $scope.publication.email, $scope.publication._id);
        var data = {
            publicationName: $scope.publication.publicationName,
            publicationType: $scope.publication.publicationType,
            publicationLanguage: $scope.publication.publicationLanguage,
            commissionRateForAdvertisments: $scope.publication.commissionRateForAdvertisments,
            commisionRateForClassifieds: $scope.publication.commisionRateForClassifieds,
            isActiveRecord: $scope.publication.isActiveRecord
        };
        console.log(data);               
        $http.post('/api/publications/'+$scope.publication._id, data).then(function (response) {
            //$scope.datas = response.data;
            //console.log(response.data);
            $location.path('/list')
        });            
    };

  }

})();    
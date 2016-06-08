(function() {
  
  angular
    .module('AdManager')
    .controller('mainController', mainController);

  mainController.$inject = ['$location', '$scope', '$rootScope', 'authentication'];
  function mainController($location, $scope, $rootScope, authentication) {
  	$scope.message = 'This is the Home Page';
  }

})();
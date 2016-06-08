// create the module and name it AdManager
        // also include ngRoute for all our routing needs
    var AdManager = angular.module('AdManager', ['ngRoute']);

    // configure our routes
    AdManager.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            .when('/list', {
                templateUrl : 'pages/list.html',
                controller  : 'listController'
            })

             // route for the edit page
            .when('/edit/:id', {
                templateUrl : 'pages/edit.html',
                controller  : 'editController'
            })
            .otherwise({redirectTo : '/'});
    });

    // AdManager.directive('fileModel', ['$parse', function ($parse) {
    //         return {
    //            restrict: 'A',
    //            link: function(scope, element, attrs) {
    //               var model = $parse(attrs.fileModel);
    //               var modelSetter = model.assign;
                  
    //               element.bind('change', function(){
    //                  scope.$apply(function(){
    //                     modelSetter(scope, element[0].files[0]);
    //                  });
    //               });
    //            }
    //         };
    //      }]);
      
    // AdManager.service('fileUpload', ['$http', function ($http) {
    //     this.uploadFileToUrl = function(file, uploadUrl){
    //        var fd = new FormData();
    //        fd.append('photos', file);
        
    //        $http.post(uploadUrl, fd, {
    //           transformRequest: angular.identity,
    //           headers: {'Content-Type': undefined}
    //        })
        
    //        .success(function(){
    //         console.log("done ===>")
    //        })
        
    //        .error(function(){
    //         console.log("error ===>")
    //        });
    //     }
    // }]);

    // AdManager.run(function($rootScope, $location, authentication){
    //   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    //     if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
    //       $location.path('/');
    //     }
    //   });
    // })    
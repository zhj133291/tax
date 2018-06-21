define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('homeIndexCtrl', ['$scope', "$rootScope", "$state",
        function ($scope, $rootScope, $state) {
        	$scope.removeRight();
        }
    ])
});
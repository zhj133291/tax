define(["app"], function(app) {
    app.directive('resize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return { 'h': w.height(), 'w': w.width() };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return { 
                        'height': (newValue.h - 50) + 'px',
                        'width': (newValue.w - 210) + 'px' 
                    };
                };

            }, true);

            element.bind('resize', function () {
                scope.$apply();
            });
        }
    })
    return app;
});
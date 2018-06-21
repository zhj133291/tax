define(['app'],function(app){
	app.directive('ngScroll', function($parse) {
	    return function(scope, element, attrs) {
	        var fn = $parse(attrs.ngScroll);
	        element.bind('scroll', function(event) {
	            scope.$apply(function() {
	                event.preventDefault();
	                fn(scope, {$event:event});
	            });
	        });
	    };
	});
})
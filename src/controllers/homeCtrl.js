define(['app', 'services/vilidateService', 'services/httpService'], function(app, vilidate, httpService) {
	app.controller('homeCtrl', ['$scope', "$rootScope", "$state", "$interval","$timeout",
		function($scope, $rootScope, $state, $interval,$timeout) {
			if(!sessionStorage.getItem("userId")){
				$state.go("login");
			}
			var urlStr="";
			var str="user/";
			$scope.ajaxData={
			    "token": "",
			    "client": "web",
			    "userId": sessionStorage.getItem("userId"),
			    "bizContent": {
			    }
			};
			$scope.userName=sessionStorage.getItem("name");
			$scope.name=sessionStorage.getItem("userName");
			$scope.menu={};
			$scope.menu.content={};
			function getMenu(){
				$scope.camel.ajax("POST","role/queryMenu",$scope.ajaxData,getMenuSuc,$scope.showMessageErr);
			}
			function getMenuSuc(data){
	    		var menu={};
	    		if(data&&data.data){
	    			$scope.roleMenu_1=data.data;
	    			// $scope.roleMenu=data.data;
	    			$.each(data.data,function(k,v){
	    				$.each($scope.words.menus,function(k1,v1){
	    					if(v.menuCode == k1){
	    						menu["home."+k1] = v1;
	    						return;
	    					}
	    				})
	    			})
	    			var timer=$interval(function(){
	    				if($(".tpl-left-nav-item") && $(".tpl-left-nav-item").length>0){
	    					$(".tpl-left-nav-item").each(function(i){
	    						var a=$(this).children("a");
	    						var sref=a.attr("ui-sref").split(".");
					        	var loc=location.href.split("/");
	    						if($(this).hasClass("urlActive") && sref[sref.length-1]!=loc[loc.length-1]){
	    							$(this).removeClass("urlActive");
	    						}else if(!$(this).hasClass("urlActive") && sref[sref.length-1]==loc[loc.length-1]){
	    							$(this).addClass("urlActive");
	    						}
	    					});
					        $interval.cancel(timer);
	    				}
	    			},10);
	    		}
	    		$scope.menu.content=menu;
	    		$scope.$apply();
	    	}
	    	getMenu();
	    	function timer(){
	    		var timer1=$interval(function(){
		          if($(".myapp-login") && $(".myapp-login").length>0){
		            $(".myapp-login").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)+"px");
		            $interval.cancel(timer1);
		          }
		        },10);
	    	}
	    	$scope.goLogin=function(){
	    		$scope.ajaxData.bizContent={};
	    		$scope.camel.ajax("POST",str+"logout",$scope.ajaxData,logoutSuc,$scope.showMessageErr);
	    	};
	    	function logoutSuc(data){
	    		if(data && data.status=="SUCCESS"){
	    			sessionStorage.removeItem("userId");
		    		sessionStorage.removeItem("userName");
		    		sessionStorage.removeItem("name");
		    		$state.go("login");
		    		timer();
	    		}
	    	}
	    	$scope.timeout=function(){
	    		sessionStorage.removeItem("userId");
	    		sessionStorage.removeItem("userName");
	    		sessionStorage.removeItem("name");
	    		$timeout(function(){$state.go("login");},3000);
	    		timer();
	    	};
		}
	])
});
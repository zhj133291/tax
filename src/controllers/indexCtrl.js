//启动初始化绑定路由切换事件
define(["app","services/wordsService",'services/vilidateService', 'services/httpService'],function(app,words,vilidate,httpService){
	app.controller("indexCtrl",["$scope","$rootScope","$state","$interval",function($scope,$rootScope,$state,$interval){
      $scope.url='https://192.168.100.118:8443/tax/';//'https://192.168.100.224:8443/tax/'
      $scope.menus={
        "url":"src/views/menu.html"
      };
      $scope.nav={
        "url":"src/views/nav.html"
      };
      $rootScope.words=words;
      $scope.camel=new httpService();
      $scope.vili=new vilidate();
      $scope.errTip={
        disabled:0
      };
      $scope.reload=function($event){
        var $dom=$($event.target);
        $(".urlActive").each(function(i){
          $(this).removeClass("urlActive");
        });
        if($event.target.nodeName=="LI"){
          location.reload();
          if(!$dom.hasClass("urlActive")){
            $dom.addClass("urlActive");
          }
        }else{
          var a="";
          if($event.target.nodeName=="A"){
            a=$($event.target);
          }else{
            a=$($event.target).parent();
          }
          if(!a.parent().hasClass("urlActive")){
            a.parent().addClass("urlActive");
          }
          var sref=a.attr("ui-sref").split(".");
          var loc=location.href.split("/");
          if(sref[sref.length-1]==loc[loc.length-1]){
            location.reload();
          }
        }
      };
      $scope.goIndex=function(){
        $(".urlActive").each(function(i){
          $(this).removeClass("urlActive");
        });
        $(".tpl-left-nav-menu li:first-child").addClass("urlActive");
      };
      $scope.goAccount=function(){
        if($(".tpl-left-nav-menu li:nth-child(2)").hasClass("urlActive")){
          location.reload();
          return;
        }
        $(".urlActive").each(function(i){
          $(this).removeClass("urlActive");
        });
        $(".tpl-left-nav-menu li:nth-child(2)").addClass("urlActive");
      };
      $scope.location=function(dom,$event){
        if ( $event.pageX == null && $event.clientX != null ) {
          var doc = document.documentElement, body = document.body;
          $event.pageX = $event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
          $event.pageY = $event.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0);
        }
        dom.css("left",$event.pageX+"px").css("top",$event.pageY+"px");
      };
      $scope.location_1=function(dom,$event,padding,margin){
        if ($event.pageX == null && $event.clientX != null ) {
          var doc = document.documentElement, body = document.body;
          $event.pageX = $event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
          $event.pageY = $event.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0);
        }
        dom.css("left",$event.pageX+10+"px").css("top",$event.pageY-padding-margin+5+"px");
      };
      if(!window.userInfo){
      	$state.go("login");
      }
      $rootScope.show_alert = function(alert_t) {
        alert_t.removeClass("hide show-anim").addClass("show-anim show");
        setTimeout(function(){
          alert_t.removeClass("show-anim show").addClass("hide");
        },3000);
      }
      $rootScope.showMessageSuc = function(data) {
        if(data){
          if(data.status == "SUCCESS"){
            $("#ajax-alert-info").html("操作成功");
          }else{
            $("#ajax-alert-info").html(data.detail);
          }
        }
        $scope.show_alert($("#ajax-alert"));
        $scope.errTip.disabled = 0;
      };
      $rootScope.showMessageErr = function(jqXHR, textStatus, errorThrown) {
        $("#ajax-alert-info").html("非常抱歉，出错了，请重新再试");
        $scope.show_alert($("#ajax-alert"));
        $scope.errTip.disabled=0;
        if($("#load") && $("#load").length>0 && $("#load").hasClass("show")){
          $("#load").removeClass("show").addClass("hide");
        }
      };
      $scope.removeRight=function(){
        if($("#right").hasClass("show")){
          $("#right").removeClass("show").addClass("hide");
        }
      };
      $scope.goStart=function(){
        if(!sessionStorage.getItem("userId")){
          $state.go("login");
        }
        var timer1=$interval(function(){
          if($(".myapp-login") && $(".myapp-login").length>0){
            $(".myapp-login").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)+"px");
            $interval.cancel(timer1);
          }
        },10);
      };
      $scope.scroll_1=function($event){
      };
      $rootScope.$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams){
              var timer=$interval(function(){
                if($("section") && $("section").length>0){
                  $("section").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)-60+"px");
                  $interval.cancel(timer);
                }
              },10);
      })
      $(document).ready(function(){
        var timer=$interval(function(){
          if($("section") && $("section").length>0){
            $("section").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)-60+"px");
            $interval.cancel(timer);
          }
        },10);
        var timer1=$interval(function(){
          if($(".myapp-login") && $(".myapp-login").length>0){
            $(".myapp-login").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)+"px");
            $interval.cancel(timer1);
          }
        },10);
      });
      $(window).resize(function(e){
        e.preventDefault();
        $("section").css("height",parseInt(document.body.clientHeight||document.documentElement.clientHeight)-60+"px");
      });
      $(window).scroll(function(e){
        e.preventDefault();
        if(!document.documentElement.clientHeight&&!document.body.clientHeight){
          return;
        }
        $("section").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)+parseInt(document.documentElement.scrollTop||document.body.scrollTop)-60+"px");
      });
      $("body").scroll(function(e){
        e.preventDefault();
        if(!document.documentElement.clientHeight&&!document.body.clientHeight){
          return;
        }
        $("section").css("height",parseInt(document.documentElement.clientHeight||document.body.clientHeight)+parseInt(document.documentElement.scrollTop||document.body.scrollTop)-60+"px");
      });
	}])
})

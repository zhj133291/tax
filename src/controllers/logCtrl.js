define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('logCtrl', ['$scope', "$rootScope", "$state","$timeout",
        function ($scope, $rootScope, $state,$timeout) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
            var str="log/";
            $scope.filter={
                operaterName:"",
                search:function(){
                    getLog();
                },
                reset:function(){
                    $("#startTime").val("");
                    $scope.filter.operaterName="";
                }
            };
            $scope.paginationConf = {
                currentPage: 1,
                totalItems: "",
                itemsPerPage: 15,
                pagesLength: 5,
                show:0,
                perPageOptions: [15],
                onChange: function () {
                    $scope.filter.search();
                }
            };
            $scope.search=function(){
                $scope.paginationConf.currentPage=1;
                $scope.paginationConf.totalItems=0;
                getLog();
            };
            function getLog(){
                $scope.ajaxData.bizContent={};
                $scope.ajaxData.bizContent.period=$("#startTime").val();
                $scope.ajaxData.bizContent.name=$scope.filter.operaterName;
                $scope.ajaxData.bizContent.pageIndex=$scope.paginationConf.currentPage;
                $scope.ajaxData.bizContent.pageSize=$scope.paginationConf.itemsPerPage;
                $scope.camel.ajax("POST",str+"getLogs",$scope.ajaxData,getLogSuc,$scope.showMessageErr);
            }
            function getLogSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                $scope.paginationConf.totalItems=data.data.logCount;
                $.each(data.data.logList,function(k,v){
                    v.operateTime=v.operateTime.split(".")[0];
                });
                $scope.logList=data.data.logList;
                $scope.$apply();
            }
            $scope.logList=[];
            getLog();
        }
    ])
});
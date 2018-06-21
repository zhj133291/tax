define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('roleAuthCtrl', ['$scope', "$rootScope", "$state","$interval",
        function ($scope, $rootScope, $state,$interval) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
            var getStr="role/";
            $scope.ajaxData.bizContent={};
            $scope.operation={
                add:0,
                edit:0,
                delete:0,
                config:0
            };
            $scope.init=function(){
                $scope.operation.add = 0;
                $scope.operation.edit = 0;
                $scope.operation.config = 0;
                $scope.operation.delete = 0;
                $scope.errTip.disabled = 0;
                $scope.step.one = 1;
                $scope.step.two = 0;
                $scope.step2.menu = [];
                $scope.addRoleData.roleName = "";
                $scope.roleName.addErr=0;
                $scope.roleName.editErr=0;
            }
            $scope.roleMenu=[];
            function getAllMenu(){
                $scope.camel.ajax("POST",getStr+"queryAllMenu",$scope.ajaxData,getMenuSuc,$scope.showMessageErr);
            }
            function getMenuSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    var arr=[];
                    $.each(data.data,function(k,v){
                        if(v.menuName!="首页" && v.menuName!="账户设置"){
                            arr.push(v);
                        }
                    });
                    $scope.roleMenu=arr;
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            getAllMenu();
            $scope.role=[];
            function getRole(){
                $scope.camel.ajax("POST",getStr+"queryRole",$scope.ajaxData,getRoleSuc,$scope.showMessageErr);
            }
            function getRoleSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.data){
                    var role=[];
                    $.each(data.data,function(k,v){
                        role.push(v);
                    })
                }
                $scope.role = role;
                $scope.$apply();
            }
            getRole();
            $scope.step={
                one:1,
                two:0
            };
            $scope.stepNext=function(){
                $scope.roleName.add.blur()
                if($scope.roleName.addErr){
                    return;
                }else{
                    $scope.step.two = 1;
                    $scope.step.one = 0;
                    var menu_timer=$interval(function(){
                        if($("#menu_config input") && $("#menu_config input").length>0){
                            $("#menu_config input").each(function(i){
                                var me=this;
                                $.each($scope.step2.menu,function(k,v){
                                    if($(me).val() == v){
                                        $(me).prop("checked",true)
                                    }
                                })
                            })
                            $interval.cancel(menu_timer);
                        }
                    },10)
                }
            }
            $scope.step2={
                menu:[]
            };
            $scope.stepPrew=function(){
                $scope.step2.menu=[];
                if($("#menu_config input:checked") && $("#menu_config input:checked").length>0){
                    $("#menu_config input:checked").each(function(i){
                        $scope.step2.menu.push($(this).val());
                    });
                }
                $scope.step.two = 0;
                $scope.step.one = 1;
            };
            $scope.addRoleData={
                roleName:"",
                menuIds:[],
            };
        	$scope.addRole=function(){
                $scope.init();
                $scope.operation.add = 1;
        	}
            $scope.confirm=function(){
                $scope.errTip.disabled = 1;
                if($scope.operation.add){
                    $scope.addRoleData.menuIds=[];
                    menuCheck($scope.addRoleData.menuIds);
                    if($scope.addRoleData.menuIds.length==0){
                        $scope.errTip.disabled=0;
                        return;
                    }
                    $scope.addRoleData.menuIds.push("1");
                    $scope.addRoleData.menuIds.push("2");
                    $scope.ajaxData.bizContent=$scope.addRoleData;
                    $scope.camel.ajax("POST",getStr+"createRole",$scope.ajaxData,addOrEditRoleSuc,$scope.showMessageErr);
                }else if ($scope.operation.edit){
                    $scope.roleName.edit.blur();
                    if($scope.roleName.editErr){
                        $scope.errTip.disabled=0;
                        return;
                    }else{
                        $scope.ajaxData.bizContent = $scope.editRoleData;
                        $scope.camel.ajax("POST",getStr+"editRole",$scope.ajaxData,addOrEditRoleSuc,$scope.showMessageErr);
                    }
                }else if($scope.operation.delete){
                    $scope.camel.ajax("POST",getStr+"deleteRole",$scope.ajaxData,addOrEditRoleSuc,$scope.showMessageErr);
                }else{
                    $scope.configRoleData.menuIds=[];
                    menuCheck($scope.configRoleData.menuIds);
                    if($scope.configRoleData.menuIds.length==0){
                        $scope.errTip.disabled=0;
                        return;
                    }
                    $scope.configRoleData.menuIds.push("1");
                    $scope.configRoleData.menuIds.push("2");
                    $scope.ajaxData.bizContent=$scope.configRoleData;
                    $scope.camel.ajax("POST",getStr+"modifyRoleMenu",$scope.ajaxData,addOrEditRoleSuc,$scope.showMessageErr);
                }
            };
            function menuCheck(roleData){
                if($("#menu_config input:checked") && $("#menu_config input:checked").length>0){
                    $("#menu_config input:checked").each(function(i){
                        roleData.push($(this).val());
                    });
                }else{
                    $("#ajax-alert-info").html("请配置功能权限菜单!");
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            $scope.deleteRole=function(roleId){
                $scope.ajaxData.bizContent={};
                $scope.ajaxData.bizContent.roleId=roleId;
                $scope.init();
                $scope.operation.delete = 1;
            };
            $scope.editRoleData={
                roleId:"",
                roleName:"",
            };
            $scope.editRole=function(roleId){
                $scope.init();
                $scope.operation.edit = 1;
                $scope.editRoleData.roleId=roleId;
                $.each($scope.role,function(k,v){
                    if(v.roleId==roleId){
                        $scope.editRoleData.roleName=v.roleName;
                    }
                })

            };
            function addOrEditRoleSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data){
                    if(data.status == "SUCCESS"){
                        if($scope.operation.delete){
                            $("#ajax-alert-info").html("删除成功");
                        }else{
                            $("#ajax-alert-info").html("操作成功");
                        }
                        getRole();
                        $scope.init();
                    }else{
                        if($scope.operation.delete){
                            $("#ajax-alert-info").html(data.data.resultMsg);
                        }else{
                            $("#ajax-alert-info").html(data.detail);
                        }
                    }
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.errTip.disabled = 0;
                $scope.$apply();
            }
            function getRoleMenuByRoleId(roleId){
                $scope.ajaxData.bizContent={};
                $scope.ajaxData.bizContent.roleId=roleId;
                $scope.camel.ajax("POST",getStr+"getRoleMenus",$scope.ajaxData,getRoleMenuByRoleIdSuc,getRoleMenuByRoleIdErr);
            }
            function getRoleMenuByRoleIdSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status == "SUCCESS"){
                    var menu_timer=$interval(function(){
                        if($("#menu_config input") && $("#menu_config input").length>0){
                            $("#menu_config input").each(function(i){
                                var me=this;
                                $.each(data.data,function(k,v){
                                    if($(me).val() == v){
                                        $(me).prop("checked",true)
                                    }
                                })
                            })
                            $interval.cancel(menu_timer);
                        }
                    },10)
                }
            }
            function getRoleMenuByRoleIdErr(jhr,textStatus,errorThrown){
                $scope.init();
                $("#ajax-alert-info").html("非常抱歉，获取菜单失败，请再试一次！");
                $scope.show_alert($("#ajax-alert"));
            }
            $scope.configRoleData={
                roleId:"",
                menuIds:[]
            };
            $scope.configRole=function(roleId){
                $scope.init();
                $scope.operation.config = 1;
                $scope.configRoleData.roleId=roleId;
                getRoleMenuByRoleId(roleId);
            }
            $scope.roleName={
                addErr:0,
                editErr:0,
                add:{
                    focus:function(){
                        $scope.roleName.addErr=0;
                    },
                    blur:function(){
                        $scope.roleName.addErr=!$scope.vili.roleName($scope.addRoleData.roleName);
                    }
                },
                edit:{
                    focus:function(){
                        $scope.roleName.editErr=0;
                    },
                    blur:function(){
                        $scope.roleName.editErr=!$scope.vili.roleName($scope.editRoleData.roleName);
                    }
                }
            };

        }
    ])
});
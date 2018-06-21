define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('organizationCtrl', ['$scope', "$rootScope", "$state","$compile","$interval","$timeout",
        function ($scope, $rootScope, $state,$compile,$interval,$timeout) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
        	var getStr="org/";
            var getStr_1="user/";
            var getStr_2="role/";
        	$scope.ajaxData.bizContent={};
            $scope.dom=$("#orgContainer .h-700");
        	$scope.noOrg=0;
            $scope.orgList="";
            $scope.orgList_all="";
            $scope.role=[];
            function getRole(){
                $scope.camel.ajax("POST",getStr_2+"queryRole",$scope.ajaxData,getRoleSuc,$scope.showMessageErr);
            }
            function getRoleSuc(data){
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
            $scope.operateUserInfo="";
            $scope.operateUserDom="";
            $scope.operateUserLiDom="";
            $scope.operateUserUlDom="";
            $scope.operateUserIconDom="";
            $scope.operateOrgInfo="";
            $scope.operateOrgDom="";
            $scope.operateOrgLiDom="";
            $scope.loginName="";
        	$scope.org={
                orgCode:"",
        		orgName:"",
                orgRemark:"",
                pOrgCode:"",
                orgLevel:"",
                pOrgRemark:"根机构"
        	};
            $scope.user={
                executorCode:"",
                loginName:"",
                loginPwd:"",
                name:"",
                sex:"1",
                orgCode:"",
                freezed:0,
                status:"",
                roleId:"",
                permis:[]
            };
            $scope.operation={
                addOrg:0,
                addUser:0,
                deleteOrg:0,
                deleteUser:0,
                editOrg:0,
                editTaxpayer:0
            };
            $scope.init=function(){
                $scope.loginPwd="";
                $scope.org={
                    orgCode:"",
                    orgName:"",
                    orgRemark:"",
                    pOrgCode:"",
                    orgLevel:"",
                    pOrgRemark:""
                };
                $scope.user={
                    executorCode:"",
                    orgName:"",
                    loginName:"",
                    loginPwd:"",
                    name:"",
                    sex:"1",
                    orgCode:"",
                    freezed:0,
                    status:"",
                    roleId:"",
                    permis:[]
                };
                $scope.operation={
                    addOrg:0,
                    addUser:0,
                    deleteOrg:0,
                    deleteUser:0,
                    editOrg:0,
                    editUser:0
                };
                $scope.vilidate.tipShow={
                    name:0,
                    executorCode:0,
                    loginName:0,
                    pwd:0
                };
                $scope.errTip.disabled=0;
                $scope.addOrEditOrgVili.orgNameErr=0;
                $scope.addOrEditOrgVili.orgCodeErr=0;
                $scope.addOrEditOrgVili.orgRemarkErr=0;
                $scope.operateOrgInfo="";
                $scope.operateOrgDom="";
                $scope.operateOrgLiDom="";
                $scope.operateUserInfo="";
                $scope.operateUserDom="";
                $scope.operateUserLiDom="";
                $scope.operateUserUlDom="";
                $scope.operateUserIconDom="";
                $scope.loginName="";
                $scope.importTip={
                    show:0,
                    show_1:0,
                    msg:"",
                    continueTip:""
                };
            };
            $scope.vilidate={
                name:{
                    blur:function(){
                        $scope.vilidate.tipShow.name=!$scope.vili.taxName($scope.user.name);
                    },
                    focus:function(){
                        $scope.vilidate.tipShow.name=0;
                    }
                },
                executorCode:{
                    blur:function(){
                        $scope.vilidate.tipShow.executorCode=!$scope.vili.executorCode($scope.user.executorCode);
                    },
                    focus:function(){
                        $scope.vilidate.tipShow.executorCode=0;
                    }
                },
                loginName:{
                    blur:function(){
                        $scope.vilidate.tipShow.loginName=!$scope.vili.loginName($scope.user.loginName);
                    },
                    focus:function(){
                        $scope.vilidate.tipShow.loginName=0;
                    }
                },
                pwd:{
                    blur:function(){
                        $scope.vilidate.tipShow.pwd=!$scope.vili.loginPwd_1($scope.user.loginPwd);
                    },
                    focus:function(){
                        $scope.vilidate.tipShow.pwd=0;
                    }
                },
                tipShow:{
                    name:1,
                    executorCode:0,
                    loginName:0,
                    pwd:0
                }
            };
            $scope.addPro=function(){
                $scope.noOrg=0;
                $scope.operation.addOrg=1;
            };
            $scope.orgLevel={
                "00":"国家税务总局",
                "11":"省级机构",
                "31":"市级机构",
                "41":"县区级机构",
                "51":"股级机构"
            };
        	function getOrganization(){
        		$scope.camel.ajax("POST",getStr+"getRootOrgByPermis",$scope.ajaxData,getOrganizationSuc,$scope.showMessageErr)
        	}
        	getOrganization();
        	function getOrganizationSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
        		if(data && data.status=="SUCCESS"){
        			if(data.data){
        				$scope.noOrg=0;
        				var str="";
                        $("#orgContainer .h-700").html("");
                        $scope.dom=$("#orgContainer .h-700");
                        var orgCode = data.data.orgCode.toString();
                        var orgName = data.data.orgName.toString();
                        var orgRemark = data.data.orgRemark.toString();
                        str+='<i class="am-icon-plus-square-o" aria-hidden="true" ng-click="toggle($event,'+'\''+orgCode+'\''+')"></i><span ng-click="editOrg($event,'+'\''+orgCode+'\''+')" ng-rightClick="operateOrg($event,'+'\''+orgCode+'\''+')">'+orgRemark+'</span>';
                        $scope.dom.append($compile(str)($scope));
        				$scope.$apply();
        			}else{
        				$scope.noOrg=1;
        			}
        		}else{
        			$("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
        		}
        	}
            function getAllOrg(){
                $scope.ajaxData.bizContent={};
                $scope.camel.ajax("POST",getStr+"getAllOrg",$scope.ajaxData,getAllOrgSuc,$scope.showMessageErr);
            }
            getAllOrg();
            function getAllOrgSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.orgList=data.data;
                    $scope.orgList_all=[];
                    var org={};
                    org.orgCode=data.data.orgCode?data.data.orgCode:"00000000000";
                    org.orgLevel=data.data.orgLevel;
                    org.orgName=data.data.orgName;
                    org.orgRemark=data.data.orgRemark;
                    org.pOrgCode=data.data.pOrgCode;
                    $scope.orgList_all.push(org);
                    listOfOrg(data.data.childOrg);
                    $scope.$apply();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            function listOfOrg(child){
                if(child){
                    $.each(child,function(k,v){
                        var org={};
                        org.orgCode=v.orgCode;
                        org.orgLevel=v.orgLevel;
                        org.orgName=v.orgName;
                        org.orgRemark=v.orgRemark;
                        org.pOrgCode=v.pOrgCode;
                        $scope.orgList_all.push(org);
                        var childOrg=v.childOrg;
                        listOfOrg(childOrg);
                    })
                }
            }
            function permis(child,str1){
                var s="";
                while(child && child.length>0){
                    $.each(child,function(k,v){
                        s+='<li><b class="am-icon-plus-square-o" ng-click="permisToggle($event)"></b><input type="checkbox" value="'+'\''+v.orgCode+'\''+'"><span>'+v.orgRemark+'</span><ul>';
                        var child=v.childOrg;
                        permis(child,s);
                        s+='</ul></li>'
                    })
                }
                str1+=s;
                return s;
            }
            function checkPermis(v){
                $scope.ajaxData.bizContent={orgCode:v};
                $scope.camel.ajax("POST",getStr_1+"checkPermis",$scope.ajaxData,checkPermisSuc,$scope.showMessageErr);
            }
            function checkPermisSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    var str="";
                    str+="<p ng-click='addChild()' ng-bind='words.organization.addChild'></p>"
                    str+="<p ng-click='addUser()' ng-bind='words.organization.addUser'></p>"
                    str+="<p ng-click='deleteOrg()' ng-bind='words.organization.deleteOrg'></p>"
                    $("#right").append($compile(str)($scope));
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
        	$scope.operateOrg=function($event,v){
                $scope.init();
                if($("#right").hasClass("hide")){
                    $("#right").removeClass("hide").addClass("show");
                }else if(v == $scope.operateOrgInfo){
                    $("#right").removeClass("show").addClass("hide");
                    return;
                }
                $("#right").html("");
                $scope.location($("#right"),$event);
                if(!v){
                    v="00000000000";
                }
                $scope.operateOrgInfo=v;
                $scope.operateOrgDom=$($event.target);
                if($($event.target).parent() && $($event.target).parent().length>0){
                    $scope.operateOrgLiDom=$($event.target).parent();
                }else{
                    $scope.dom=$("#orgContainer .h-700");
                }
                checkPermis(v);
            };
            $scope.addChild=function(){
                $("#right").removeClass("show").addClass("hide");
                $("#right").html("");
                $scope.org.orgCode="";
                $scope.org.orgName="";
                $scope.org.orgRemark="";
                $scope.org.pOrgCode=$scope.operateOrgInfo;
                $scope.org.pOrgRemark=$scope.operateOrgDom.html();
                $scope.org.orgLevel="";
                $scope.operation.addOrg=1;
            };
            $scope.addUser=function(){
                $scope.operation.addUser=1;
                $scope.user={
                    executorCode:"",
                    orgName:$scope.operateOrgDom.html(),
                    loginName:"",
                    loginPwd:"",
                    name:"",
                    sex:"1",
                    orgCode:$scope.operateOrgInfo,
                    freezed:0,
                    status:"",
                    roleId:"",
                    permis:[]
                };
                $("#permisList b").each(function(i){
                    if($(this).hasClass("am-icon-minus-square-o")){
                        $(this).removeClass("am-icon-minus-square-o").addClass("am-icon-plus-square-o");
                        if($(this).siblings("ul") && $(this).siblings("ul").length>0){
                            $(this).siblings("ul").css("display","none");
                        }
                    }
                });
                $("#permisList input").each(function(i){
                    if($(this).is(":checked")){
                        $(this).removeAttr("checked");
                    }
                });
                $("#permisList input").each(function(i){
                    if($(this).val()==$scope.user.orgCode){
                        $(this).prop("checked",true);
                        var me=this;
                        var input=$(me).siblings("ul").find("input");
                        input.each(function(k){
                            $(this).prop("checked",true);
                        });
                        return false;
                    }
                });
                $scope.resetBtn.show=0;
                $("#right").html("");
                $("#right").removeClass("show").addClass("hide");
            };
            $scope.saveUser=function(){
                $scope.vilidate.name.blur();
                $scope.vilidate.executorCode.blur();
                $scope.vilidate.loginName.blur();
                if(!$scope.resetBtn.show){
                    $scope.vilidate.pwd.blur();
                }
                if($scope.vilidate.tipShow.name || $scope.vilidate.tipShow.pwd ||  $scope.vilidate.tipShow.executorCode || $scope.vilidate.tipShow.loginName){
                    return;
                }
                $scope.savePermis();
                if(!$("#roleCode").val()){
                    $("#ajax-alert-info").html("请选择关联角色");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                if($scope.user.permis.length==0){
                    $("#ajax-alert-info").html("请选择数据权限区域");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={loginName:$scope.user.loginName};
                if($scope.loginName==$scope.user.loginName){
                    $scope.ajaxData.bizContent={};
                    $scope.ajaxData.bizContent.name=$scope.user.name;
                    $scope.ajaxData.bizContent.sex=$scope.user.sex;
                    $scope.ajaxData.bizContent.executorCode=$scope.user.executorCode;
                    $scope.ajaxData.bizContent.loginName=$scope.user.loginName;
                    if(!$scope.resetBtn.show){
                        $scope.ajaxData.bizContent.loginPwd=$scope.user.loginPwd;
                    }else{
                        $scope.ajaxData.bizContent.loginPwd=$scope.loginPwd;
                    }
                    $scope.ajaxData.bizContent.roleId=$("#roleCode").val();
                    $scope.ajaxData.bizContent.orgCode=$scope.user.orgCode;
                    $scope.ajaxData.bizContent.freezed=$scope.user.freezed;
                    $scope.ajaxData.bizContent.permis=$scope.user.permis;
                    var str="";
                    if($scope.operation.addUser){
                        str+="addTaxUser";
                    }else{
                        str+="editTaxUser";
                    }
                    $scope.camel.ajax("POST",getStr_1+str,$scope.ajaxData,addOrEditUserSuc,$scope.showMessageErr);
                }else{
                    $scope.camel.ajax("POST",getStr_1+"judgeLoginName",$scope.ajaxData,judgeLoginNameSuc,$scope.showMessageErr);
                }
            };
            function judgeLoginNameSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.ajaxData.bizContent={};
                    $scope.ajaxData.bizContent.name=$scope.user.name;
                    $scope.ajaxData.bizContent.sex=$scope.user.sex;
                    $scope.ajaxData.bizContent.executorCode=$scope.user.executorCode;
                    $scope.ajaxData.bizContent.loginName=$scope.user.loginName;
                    $scope.ajaxData.bizContent.loginPwd=$scope.user.loginPwd;
                    $scope.ajaxData.bizContent.roleId=$("#roleCode").val();
                    $scope.ajaxData.bizContent.orgCode=$scope.user.orgCode;
                    $scope.ajaxData.bizContent.freezed=$scope.user.freezed;
                    $scope.ajaxData.bizContent.permis=$scope.user.permis;
                    var str="";
                    if($scope.operation.addUser){
                        str+="addTaxUser";
                    }else{
                        str+="editTaxUser";
                    }
                    $scope.camel.ajax("POST",getStr_1+str,$scope.ajaxData,addOrEditUserSuc,$scope.showMessageErr);
                }else{
                    $("#ajax-alert-info").html("账户已存在");
                    $scope.show_alert($("#ajax-alert"));
                    $scope.errTip.disabled=0;
                    $scope.$apply();
                }
            }
            function addOrEditUserSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status == "SUCCESS"){
                    $("#ajax-alert-info").html("人员变更成功");
                    var str;
                    if($scope.operation.addUser){
                        str="<li><span ng-click='editUser($event,"+$scope.user.executorCode+")' ng-rightClick='deleteUser($event,"+$scope.user.executorCode+")'>"+$scope.user.name+"</span></li>";
                        $scope.operateOrgDom.siblings(".user").prepend($compile(str)($scope));
                    }else{
                        str="<span ng-click='editUser($event,"+$scope.user.executorCode+")' ng-rightClick='deleteUser($event,"+$scope.user.executorCode+")'>"+$scope.user.name+"</span>";
                        $scope.operateUserLiDom.html("");
                        $scope.operateUserLiDom.append($compile(str)($scope));
                    }
                    $scope.init();
                    $scope.$apply();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
            $scope.addOrEditOrgVili={
                orgNameErr:0,
                orgRemarkErr:0,
                orgCodeErr:0,
                orgName:{
                    focus:function(){
                        $scope.addOrEditOrgVili.orgNameErr=0;
                    },
                    blur:function(){
                        $scope.addOrEditOrgVili.orgNameErr=!$scope.vili.orgName($scope.org.orgName);
                    }
                },
                orgRemark:{
                    focus:function(){
                        $scope.addOrEditOrgVili.orgRemarkErr=0;
                    },
                    blur:function(){
                        $scope.addOrEditOrgVili.orgRemarkErr=!$scope.vili.orgName($scope.org.orgRemark);
                    }
                },
                orgCode:{
                    focus:function(){
                        $scope.addOrEditOrgVili.orgCodeErr=0;
                    },
                    blur:function(){
                        $scope.addOrEditOrgVili.orgCodeErr=!$scope.vili.executorCode_1($scope.org.orgCode);
                    }
                }
            };
            $scope.addOrg=function(){
                $scope.addOrEditOrgVili.orgName.blur();
                $scope.addOrEditOrgVili.orgRemark.blur();
                $scope.addOrEditOrgVili.orgCode.blur();
                if($scope.addOrEditOrgVili.orgNameErr+$scope.addOrEditOrgVili.orgRemarkErr+$scope.addOrEditOrgVili.orgCodeErr){
                    return;
                }
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={};
                $scope.ajaxData.bizContent.orgCode=$scope.org.orgCode;
                $scope.ajaxData.bizContent.orgName=$scope.org.orgName;
                $scope.ajaxData.bizContent.orgRemark=$scope.org.orgRemark;
                $scope.ajaxData.bizContent.pOrgCode=$scope.org.pOrgCode;
                $scope.ajaxData.bizContent.orgLevel=$("#level").val();
                if($scope.operation.addOrg){
                    $scope.camel.ajax("POST",getStr+"addDept",$scope.ajaxData,addOrgSuc,$scope.showMessageErr);
                }else{
                    $scope.camel.ajax("POST",getStr+"editDept",$scope.ajaxData,addOrgSuc,$scope.showMessageErr);
                }
            };
            function addOrgSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $.each($scope.orgList_all,function(k,v){
                        if(v.orgCode == $scope.org.orgCode){
                            v.orgName=$scope.org.orgName;
                            return false;
                        }
                    });
                    $("#ajax-alert-info").html("组织机构变更成功");
                    if(!$("#orgContainer .h-700 i") || $("#orgContainer .h-700 i").length==0){
                        $scope.ajaxData.bizContent={};
                        getOrganization();
                    }else{
                        if($scope.operation.addOrg && $scope.operateOrgDom.siblings(".org") && $scope.operateOrgDom.siblings(".org").length>0){
                            var str='<li><i class="am-icon-plus-square-o" aria-hidden="true" ng-click="toggle($event,'+'\''+$scope.org.orgCode+'\''+')"></i><span ng-click="editOrg($event,'+'\''+$scope.org.orgCode+'\''+')" ng-rightClick="operateOrg($event,'+'\''+$scope.org.orgCode+'\''+')">'+$scope.org.orgRemark+'</span></li>';
                            $scope.operateOrgDom.siblings(".org").prepend($compile(str)($scope));
                        }else if($scope.operation.editOrg){
                            $scope.operateOrgDom.html($scope.org.orgRemark);
                        }
                    }
                    $scope.init();
                    $scope.ajaxData.bizContent={};
                    getAllOrg();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
            $scope.editOrg=function($event,orgCode){
                $scope.init();
                $scope.operateOrgDom=$($event.target);
                if(!orgCode){
                    orgCode="00000000000";
                }
                $scope.org.orgCode=orgCode;
                $scope.org.orgName="";
                $scope.org.orgRemark=$scope.operateOrgDom.html();
                $scope.org.pOrgCode="";
                $scope.org.pOrgRemark="";
                $scope.org.orgLevel="";
                var timer=$interval(function(){
                    if($scope.orgList_all && $scope.orgList_all.length>0){
                        $.each($scope.orgList_all,function(k,v){
                            if(v.orgCode == orgCode){
                                $scope.org.orgName=v.orgName;
                                $scope.org.pOrgCode=v.pOrgCode;
                                $scope.org.orgLevel=v.orgLevel;
                                return false;
                            }
                        });
                        $interval.cancel(timer);
                    }
                },10)
                var pSpan=$scope.operateOrgDom.parent().parent().siblings("span");
                if(pSpan && pSpan.length>0){
                    $scope.org.pOrgRemark=pSpan.html();
                }else{
                    $scope.org.pOrgRemark="根机构";
                }
                $scope.operation.editOrg=1;
                var b=$interval(function(){
                    if($("#addOrg") && $("#addOrg").length>0){
                        if(!$scope.$apply){
                            $scope.$apply();
                        }
                        $interval.cancel(b);
                    }
                },10);
            };
            $scope.deleteOrg=function(){
                $("#right").removeClass("show").addClass("hide");
                $("#right").html("");
                $scope.operation.deleteOrg=1;
                var timer=$interval(
                    function(){
                        if($("#org_op") && $("#org_op").length>0){
                            $("#org_op").html("是否确认删除"+$scope.operateOrgDom.html()+"?");
                            $interval.cancel(timer);
                        }
                    },10
                );
            };
            $scope.deleteConfirm=function(){
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={};
                if($scope.operation.deleteUser){
                    $scope.ajaxData.bizContent.executorCode=$scope.operateUserInfo;
                    $scope.camel.ajax("POST",getStr_1+"deleteTaxUser",$scope.ajaxData,deleteUserSuc,$scope.showMessageErr);
                }else{
                    $scope.ajaxData.bizContent.orgCode=$scope.operateOrgInfo;
                    $scope.camel.ajax("POST",getStr+"deleteDept",$scope.ajaxData,deleteOrgSuc,$scope.showMessageErr);
                }
            };
            function deleteUserSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("税务人员删除成功");
                    $scope.operateUserDom.remove();
                    $scope.init();
                    $scope.ajaxData.bizContent={};
                    getAllOrg();
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
            function deleteOrgSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("组织机构删除成功");
                    if($scope.operateOrgLiDom && $scope.operateOrgLiDom.length>0){
                        $scope.operateOrgLiDom.remove();
                    }else{
                        $scope.dom.html("");
                    }
                    $scope.init();
                    $scope.ajaxData.bizContent={};
                    $scope.camel.ajax("POST",getStr+"getAllOrg",$scope.ajaxData,getAllOrgSuc,$scope.showMessageErr);
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
            $scope.editUser=function($event,userId){
                $scope.init();
                $scope.operation.editUser=1;
                $scope.resetBtn.show=1;
                $scope.ajaxData.bizContent={executorCode:userId};
                $scope.operateUserDom=$($event.target);
                $scope.operateUserLiDom=$scope.operateUserDom.parent();
                $scope.user.orgName=$($event.target).parent().parent().siblings("span").html();
                $scope.camel.ajax("POST",getStr_1+"getUserDetail",$scope.ajaxData,getUserDetailSuc,$scope.showMessageErr);
            };
            $scope.loginPwd="";
            function getUserDetailSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.user.executorCode=data.data.executorCode;
                    $scope.user.loginName=data.data.loginName;
                    $scope.loginName=data.data.loginName;
                    $scope.user.loginPwd="123456";
                    $scope.loginPwd=data.data.loginPwd;
                    $scope.user.name=data.data.name;
                    $scope.user.sex=data.data.sex;
                    $scope.user.orgCode=data.data.orgCode;
                    $scope.user.freezed=data.data.freezed;
                    $scope.user.status=data.data.status;
                    $scope.user.permis=data.data.permis;
                    $scope.user.roleId=data.data.roleId;
                    var timer=$interval(function(){
                        if($("#permisList b") && $("#permisList b").length>1){
                            $("#permisList b").each(function(i){
                                if($(this).hasClass("am-icon-minus-square-o")){
                                    $(this).removeClass("am-icon-minus-square-o").addClass("am-icon-plus-square-o");
                                    if($(this).siblings("ul") && $(this).siblings("ul").length>0){
                                        $(this).siblings("ul").css("display","none");
                                    }
                                }
                            });
                            $("#permisList input").each(function(i){
                                if($(this).is(":checked")){
                                    $(this).removeAttr("checked");
                                }
                            });
                            var a=$("#permisList input");
                            $.each($scope.user.permis,function(k,v){
                                a.each(function(i){
                                    if($(this).val()==v){
                                        a.splice(i,1);
                                        if(!$(this).is(":checked")){
                                            $(this).prop("checked", true);
                                        }
                                        return false;
                                    }
                                })
                            });
                            $interval.cancel(timer);
                        }
                    },10);
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            $scope.editPermis=function(){
                $("#permisContainer").removeClass("hide").addClass("show");
            }
            $scope.closePermis=function(){
                $("#permisContainer").removeClass("show").addClass("hide");
            }
            $scope.savePermis=function(){
                var arr=[];
                $("#permisList input:checked").each(function(i){
                    arr.push($(this).val());
                });
                if($("#permisContainer").hasClass("show")){
                    $("#permisContainer").removeClass("show").addClass("hide");
                }
                $scope.errTip.disabled=0;
                $scope.user.permis=arr;
            };
            $scope.checkboxClick=function($event){
                var $dom=$($event.target);
                var $ul=$dom.siblings("ul");
                var $li=$dom.parent("li");
                if($dom.is(":checked")){
                    $ul.find("input").each(function(i){
                        $(this).prop("checked",true);
                    });
                    // up_check($li);
                }else{
                    $ul.find("input").each(function(i){
                        $(this).removeAttr("checked");
                    });
                    // up_unCheck($li);
                }
            };
            function up_check($li){
                if(!$li || !$li[0] || $li[0].nodeName!="LI"){
                    return;
                }
                if(!$li.siblings("li") || $li.siblings("li").length==0){
                    $li.parent().siblings("input").prop("checked",true);
                    var li=$li.parent().parent();
                    up_check(li);
                }else{
                    var a=1;
                    $li.siblings("li").each(function(i){
                        if(!$(this).children("input").is(":checked")){
                            a=0;
                            return false;
                        }
                    })
                    if(a){
                        $li.parent().siblings("input").prop("checked",true);
                        var li_1=$li.parent().parent();
                        up_check(li_1);
                    }
                }
            }
            function up_unCheck($li){
                if(!$li || !$li[0] || $li[0].nodeName!="LI"){
                    return;
                }
                $li.parent().siblings("input").removeAttr("checked");
                var li=$li.parent().parent();
                up_unCheck(li);
            }
            $scope.resetBtn={
                show:1,
                resetPwd:function(){
                    $scope.resetBtn.show=0;
                    $scope.user.loginPwd="";
                }
            };
            $scope.deleteUser=function($event,userId){
                $scope.init();
                if($("#right").hasClass("hide")){
                    $("#right").removeClass("hide").addClass("show");
                }else if(userId == $scope.operateUserInfo){
                    $("#right").removeClass("show").addClass("hide");
                    return;
                }
                $scope.location($("#right"),$event);
                $scope.operateUserInfo=userId;
                $scope.operateUserDom=$($event.target);
                $scope.operateUserLiDom=$($event.target).parent();
                $scope.operateUserUlDom=$($event.target).parent().parent();
                $scope.operateUserIconDom=$($event.target).parent().parent().siblings("i");
                var str="";
                str+="<p ng-click='deleteUserComfirm()' ng-bind='words.organization.deleteUser'></p>";
                $("#right").html("");
                $("#right").append($compile(str)($scope));
            };
            $scope.deleteUserComfirm=function(){
                $("#right").html("");
                $("#right").removeClass("show").addClass("hide");
                $scope.operation.deleteUser=1;
                var timer=$interval(
                    function(){
                        if($("#org_op") && $("#org_op").length>0){
                            $("#org_op").html("确认删除税务人员"+$scope.operateUserDom.html()+"?");
                            $interval.cancel(timer);
                        }
                    },10
                );
            };
            $scope.toggle=function($event,v){
                if(!v){
                    v="00000000000";
                }
                var dom=$event.target;
                $scope.dom=$(dom).parent();
                var ul;
                ul=$(dom).siblings("ul");
                if(ul && ul.length>0 && ul.css("display")=="none"){
                    ul.slideDown(200);
                    $(dom).removeClass("am-icon-plus-square-o").addClass("am-icon-minus-square-o");
                }else if((!ul && $(dom).hasClass("am-icon-plus-square-o")) || (ul.length==0 && $(dom).hasClass("am-icon-plus-square-o"))){
                    $scope.ajaxData.bizContent={};
                    $scope.ajaxData.bizContent.orgCode=v;
                    $scope.camel.ajax("POST",getStr+"getDeptByOrgPermis",$scope.ajaxData,getDeptByOrgSuc,$scope.showMessageErr);
                    $(dom).removeClass("am-icon-plus-square-o").addClass("am-icon-minus-square-o");
                }else{
                    ul.slideUp(200);
                    $(dom).removeClass("am-icon-minus-square-o").addClass("am-icon-plus-square-o");
                }
            };
            $scope.permisToggle=function($event){
                var dom=$event.target;
                var ul;
                ul=$(dom).siblings("ul");
                if(ul && ul.length>0){
                    if(ul.css("display")=="none"){
                        ul.slideDown(200);
                        $(dom).removeClass("am-icon-plus-square-o").addClass("am-icon-minus-square-o");
                    }else{
                        ul.slideUp(200);
                        $(dom).removeClass("am-icon-minus-square-o").addClass("am-icon-plus-square-o");
                    }
                }else{
                    if($(dom).hasClass("am-icon-plus-square-o")){
                        $(dom).removeClass("am-icon-plus-square-o").addClass("am-icon-minus-square-o");
                    }else{
                        $(dom).removeClass("am-icon-minus-square-o").addClass("am-icon-plus-square-o");
                    }
                }
            };
            function getDeptByOrgSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status == "SUCCESS"){
                    if($scope.dom.children("ul") && $scope.dom.children("ul").length>0){
                        return;
                    }
                    if(data.data.user.length==0 && data.data.org.length==0){
                        return;
                    }
                    var str="";
                    var str_1="<ul class='user'>";
                    var str_2="<ul class='org'>";
                    $.each(data.data.user,function(k,v){
                        str_1+="<li><span ng-click='editUser($event,"+v.executorCode+")' ng-rightClick='deleteUser($event,"+v.executorCode+")'>"+v.name+"</span></li>";
                    });
                    $.each(data.data.org,function(k,v){
                        str_2+='<li><i class="am-icon-plus-square-o" aria-hidden="true" ng-click="toggle($event,'+'\''+v.orgCode.toString()+'\''+')"></i><span ng-click="editOrg($event,'+'\''+v.orgCode.toString()+'\''+')" ng-rightClick="operateOrg($event,'+'\''+v.orgCode.toString()+'\''+')">'+v.orgRemark+'</span></li>';
                    });
                    str_1+="</ul>";
                    str_2+="</ul>";
                    str=str_1+str_2;
                    $scope.dom.append($compile(str)($scope));
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            $('#orgContainer').bind('contextmenu',function(event){
                var dom=event.target;
                if(dom.nodeName!=="SPAN"&&$("#right").html()){
                    $("#right").removeClass("show").addClass("hide").html("");
                }
                return false;
            });
            $('#orgContainer').bind('click',function(event){
                var dom=event.target;
                if($("#right").html()){
                    $("#right").removeClass("show").addClass("hide").html("");
                }
                return false;
            });
            $scope.import=function(type){
                $scope.init();
                if(type=="org"){
                    $("#importOrg").click();
                }else{
                    $("#importTax").click();
                }
            }
            $scope.photoCheck = function (obj,type) {
                if(!obj.files){
                    $("#ajax-alert-info").html("请选择文件");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                var formData=new FormData();
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                if(type=="org"){
                    formData.append("orgFile",obj.files[0]);
                    $.ajax(
                        {
                            url:$scope.url+getStr+"importOrg",
                            method:"POST",
                            async: false,
                            cache: false,
                            data:formData,
                            processData:false,
                            contentType:false,
                            dataType:"json",
                            xhrFields:{withCredentials:true},
                            crossDomain:true,
                            success:importSuc,
                            error:$scope.showMessageErr
                        }
                    );
                }else{
                    formData.append("userFile",obj.files[0]);
                    $.ajax(
                        {
                            url:$scope.url+getStr_1+"importExecutor",
                            method:"POST",
                            async: false,
                            cache: false,
                            data:formData,
                            processData:false,
                            contentType:false,
                            dataType:"json",
                            xhrFields:{withCredentials:true},
                            crossDomain:true,
                            success:importUserSuc,
                            error:$scope.showMessageErr
                        }
                    );
                }
                $(obj).val("");
            };
            function importSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("导入成功");
                    $scope.show_alert($("#ajax-alert"));
                    $("#orgContainer .h-700").html("");
                    $scope.ajaxData.bizContent={};
                    getOrganization();
                    getAllOrg();
                }else if(data.data && data.data.resultCode && data.data.resultCode==40014){
                    $scope.importTip.show=1;
                    $scope.importTip.msg=data.data.resultMsg;
                    $scope.importTip.continueTip=data.data.continueTip;
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            function importUserSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("导入成功");
                    $scope.show_alert($("#ajax-alert"));
                    $("#orgContainer .h-700").html("");
                    $scope.ajaxData.bizContent={};
                    getOrganization();
                }else if(data.data && data.data.resultCode && data.data.resultCode==40014){
                    $scope.importTip.show_1=1;
                    $scope.importTip.msg=data.data.resultMsg;
                    $scope.importTip.continueTip=data.data.continueTip;
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            $scope.importTip={
                show:0,
                show_1:0,
                msg:"",
                continueTip:""
            };
            $scope.continue=function(){
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={continueTip:$scope.importTip.continueTip};
                if($scope.importTip.show){
                    $scope.camel.ajax("POST",getStr+"conimportOrg",$scope.ajaxData,continueSuc,$scope.showMessageErr);
                }else{
                    $scope.camel.ajax("POST",getStr_1+"conimportExecutor",$scope.ajaxData,continueSuc,$scope.showMessageErr);
                }
            }
            function continueSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("导入成功");
                    $scope.errTip.disabled=0;
                    $scope.show_alert($("#ajax-alert"));
                    $("#orgContainer .h-700").html("");
                    $scope.ajaxData.bizContent={};
                    getOrganization();
                    getAllOrg();
                }else{
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.errTip.disabled=0;
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.init();
                $scope.$apply();
            }
        }
    ])
});
define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('taxpayerCtrl', ['$scope', "$rootScope", "$state","$compile","$interval","$timeout",
        function ($scope, $rootScope, $state,$compile,$interval,$timeout) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
            var url="";
            var getStr="org/";
            var getStr_1="user/";
            var getStr_2="taxpayer/";
            $scope.ajaxData.bizContent={};
            $scope.dom=$("#orgContainer .h-700");
            $scope.operateUserInfo="";
            $scope.operateUserDom="";
            $scope.operateUserLiDom="";
            $scope.operateUserUlDom="";
            $scope.operateUserIconDom="";
            $scope.operateOrgInfo="";
            $scope.operateOrgDom="";
            $scope.operateOrgLiDom="";
            $scope.loginName="";
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
                    str+="<p ng-click='addTaxpayer()' ng-bind='words.taxpayer.addTaxpayer'></p>"
                    $("#right").html("");
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
                    if(data.data.taxpayer.length==0 && data.data.org.length==0){
                        return;
                    }
                    var str="";
                    var str_1="<ul class='user'>";
                    var str_2="<ul class='org'>";
                    $.each(data.data.taxpayer,function(k,v){
                        str_1+="<li><span class='ell' title='"+v.payerName+"' ng-click='editTaxpayer("+"$event,"+"\""+v.payerCode+"\""+")' ng-rightClick='deleteUser($event,"+"\""+v.payerCode+"\""+",\""+v.payerName+"\""+")'>"+v.payerName+"</span></li>";
                    });
                    $.each(data.data.org,function(k,v){
                        str_2+='<li><i class="am-icon-plus-square-o" aria-hidden="true" ng-click="toggle($event,'+'\''+v.orgCode.toString()+'\''+')"></i><span ng-rightClick="operateOrg($event,'+'\''+v.orgCode.toString()+'\''+')">'+v.orgRemark+'</span></li>';
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
            $scope.artFileList=[];
            $scope.arrFileList=[];
            $scope.finFileList=[];
            $scope.user={
                "orgCode":"",
                "orgName":"",
                "payerCode": "",
                "payerName": "",
                "artificialName": "",
                "artificialId": "",
                "artificialPhone": "",
                "financeName": "",
                "financeId": "",
                "financePhone": "",
                "arrangeName": "",
                "arrangeId": "",
                "arrangePhone": "",
                "status": 1,
                "artPhotoList": [],
                "finPhotoList": [],
                "arrPhotoList": []
            };
            $scope.init=function(){
                $scope.continue=0;
                $scope.operation={
                    add:0,
                    edit:0,
                    delete:0
                };
                $scope.user={
                    "orgCode":"",
                    "orgRemark":"",
                    "payerCode": "",
                    "payerName": "",
                    "artificialName": "",
                    "artificialId": "",
                    "artificialPhone": "",
                    "financeName": "",
                    "financeId": "",
                    "financePhone": "",
                    "arrangeName": "",
                    "arrangeId": "",
                    "arrangePhone": "",
                    "status": 1,
                    "artPhotoList": [],
                    "finPhotoList": [],
                    "arrPhotoList": []
                };
                $scope.tip.tipShow={
                    payerCode: 0,
                    payerName: 0,
                    artificialName: 0,
                    artificialId: 0,
                    artificialPhone: 0,
                    financeName: 0,
                    financeId: 0,
                    financePhone: 0,
                    arrangeName: 0,
                    arrangeId: 0,
                    arrangePhone: 0,
                    ex: 0
                };
                $scope.user_delete={
                    tip:"",
                    code:""
                };
                $scope.artFileList=[];
                $scope.arrFileList=[];
                $scope.finFileList=[];
                $scope.importTip={
                    show:0,
                    msg:"",
                    continueTip:""
                };
            };
            $scope.operation={
                add:0,
                edit:0,
                delete:0
            };
            $scope.editTaxpayer=function($event,v){
                $scope.init();
                $scope.operateUserDom=$($event.target);
                $scope.operateUserLiDom=$scope.operateUserDom.parent();
                $scope.operation.edit=1;
                getPayerDetail(v);

            };
            function getPayerDetail(payerCode){
                $scope.ajaxData.bizContent={payerCode:payerCode};
                $scope.camel.ajax("POST",getStr_2+"getPayerDetail",$scope.ajaxData,getPayerDetailSuc,$scope.showMessageErr);
            }
            function getPayerDetailSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.user=data.data;
                    var arr=[],arr1=[],arr2=[];
                    var fileName="";
                    $.each($scope.user.arrPhotoList,function(k,v){
                        fileName=v.split("\\")[v.split("\\").length-1]
                        arr.push({name:fileName,path:v});
                    });
                    $.each($scope.user.artPhotoList,function(k1,v1){
                        fileName=v1.split("\\")[v1.split("\\").length-1]
                        arr1.push({name:fileName,path:v1});
                    });
                    $.each($scope.user.finPhotoList,function(k2,v2){
                        fileName=v2.split("\\")[v2.split("\\").length-1]
                        arr2.push({name:fileName,path:v2});
                    });
                    $scope.user.arrPhotoList=arr;
                    $scope.user.artPhotoList=arr1;
                    $scope.user.finPhotoList=arr2;
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            $scope.addTaxpayer=function(){
                $scope.init();
                $scope.user.orgRemark=$scope.operateOrgDom.html();
                $scope.user.orgCode=$scope.operateOrgInfo;
                $scope.operation.add=1;
                $("#right").html("");
                $("#right").removeClass("show").addClass("hide");
            };
            $scope.arrClick=function(id){
                $("#"+id).click();
            };
            $scope.photoCheck = function (obj,type) {
                if(!obj.files){
                    $("#ajax-alert-info").html("请选择图片");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                if(!(obj.files[0].type=="image/png"||obj.files[0].type=="image/jpeg"||obj.files[0].type=="image/bmp"||obj.files[0].type=="image/png")){
                    $("#ajax-alert-info").html("请上传jpg，jpeg，bmp，png格式的图片");
                    $scope.show_alert($("#ajax-alert"));
                    $(obj).val("");
                    return;
                }
                if((type=="artificial" && $scope.user.artPhotoList.length==3) || (type=="arrange" && $scope.user.arrPhotoList.length==3) ||(type=="finance" && $scope.user.finPhotoList.length==3)){
                    $("#ajax-alert-info").html("最多选择3张图片");
                    $scope.show_alert($("#ajax-alert"));
                    $(obj).val("");
                    return;
                }
                photo_flag = true;
                var fSize = 50.9 * 1024*1024;
                var fileType;
                var fileSize;
                var filePath;
                var fileName;
                    var reader = new FileReader();
                    var thisFile = obj.files[0];
                    var isFirefox=navigator.userAgent.indexOf("Firefox");
                    fileType = thisFile.type;
                    fileSize = isFirefox > 0 ?  thisFile.size : thisFile.fileSize;
                    reader.readAsDataURL(thisFile);
                    fileName=thisFile.name;
                    if(type=="artificial"){
                        $scope.artFileList.push({name:fileName,file:thisFile});
                    }else if(type=="arrange"){
                        $scope.arrFileList.push({name:fileName,file:thisFile});
                    }else{
                       $scope.finFileList.push({name:fileName,file:thisFile});
                    }
                    reader.onloadend = function(event) {
                        var imgObj = new Image();
                        imgObj.src = event.target.result;
                        imgObj.onload = function(event) {

                            filePath = this.src;
                            if(type=="artificial"){
                                $scope.user.artPhotoList.push({name:fileName,path:filePath});
                            }else if(type=="arrange"){
                                $scope.user.arrPhotoList.push({name:fileName,path:filePath});
                            }else{
                                $scope.user.finPhotoList.push({name:fileName,path:filePath});
                            }
                            $scope.$apply();
                            $(obj).val("");
                        }
                    }
            };
            $scope.deletePic=function($event,v,type){
                if(type=="artificial"){
                    $.each($scope.user.artPhotoList,function(k,val){
                        if(v.path==val.path){
                            $scope.user.artPhotoList.splice(k,1);
                            return false;
                        }
                    });
                    $.each($scope.artFileList,function(k,val){
                        if(v.name==val.name){
                            $scope.artFileList.splice(k,1);
                            return false;
                        }
                    });
                }else if(type=="finance"){
                    $.each($scope.user.finPhotoList,function(k,val){
                        if(v.path==val.path){
                            $scope.user.finPhotoList.splice(k,1);
                            return false;
                        }
                    });
                    $.each($scope.finFileList,function(k,val){
                        if(v.name==val.name){
                            $scope.finFileList.splice(k,1);
                            return false;
                        }
                    });
                }else{
                    $.each($scope.user.arrPhotoList,function(k,val){
                        if(v.path==val.path){
                            $scope.user.arrPhotoList.splice(k,1);
                            return false;
                        }
                    });
                    $.each($scope.arrFileList,function(k,val){
                        if(v.name==val.name){
                            $scope.arrFileList.splice(k,1);
                            return false;
                        }
                    });
                }
                if($scope.operation.edit){
                    $("#ajax-alert-info").html("删除图片成功");
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            function exSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    if(data.data.taxPayer.length!=0){
                        $scope.tip.tipShow.ex=1;
                    }
                }
            }
            function exErr(jqXHR, textStatus, errorThrown){
            }
            $scope.tip={
                payerCode:{
                    focus:function(){
                        $scope.tip.tipShow.payerCode=0;
                        $scope.tip.tipShow.ex=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.payerCode=!$scope.vili.payerCode($scope.user.payerCode);
                        if($scope.tip.tipShow.payerCode || $scope.operation.edit){
                            return;
                        }
                        var formData=new FormData();
                        formData.append("client",$scope.ajaxData.client);
                        formData.append("token",$scope.ajaxData.token);
                        formData.append("userId",$scope.ajaxData.userId);
                        formData.append("payerCode",$scope.user.payerCode);
                        formData.append("payerName","");
                        formData.append("pageIndex",1);
                        formData.append("pageCount",15);
                        $.ajax(
                            {
                                url:$scope.url+getStr_2+"getPayer",
                                method:"POST",
                                async: false,
                                cache: false,
                                data:formData,
                                processData:false,
                                contentType:false,
                                dataType:"json",
                                xhrFields:{withCredentials:true},
                                crossDomain:true,
                                success:exSuc,
                                error:exErr
                            }
                        );
                    }
                },
                payerName:{
                    focus:function(){
                        $scope.tip.tipShow.payerName=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.payerName=!$scope.vili.payerName($scope.user.payerName);
                    }
                },
                artificialName:{
                    focus:function(){
                        $scope.tip.tipShow.artificialName=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.artificialName=!$scope.vili.taxName($scope.user.artificialName);
                    }
                },
                artificialPhone:{
                    focus:function(){
                        $scope.tip.tipShow.artificialPhone=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.artificialPhone=!$scope.vili.phoneNumber($scope.user.artificialPhone);
                    }
                },
                artificialId:{
                    focus:function(){
                        $scope.tip.tipShow.artificialId=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.artificialId=!$scope.vili.arrId($scope.user.artificialId);
                    }
                },
                financeName:{
                    focus:function(){
                        $scope.tip.tipShow.financeName=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.financeName=!$scope.vili.taxName($scope.user.financeName);
                    }
                },
                financePhone:{
                    focus:function(){
                        $scope.tip.tipShow.financePhone=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.financePhone=!$scope.vili.phoneNumber($scope.user.financePhone);
                    }
                },
                financeId:{
                    focus:function(){
                        $scope.tip.tipShow.financeId=0;
                    },
                    blur:function(){
                        $scope.tip.tipShow.financeId=!$scope.vili.arrId($scope.user.financeId);
                    }
                },
                arrangeName:{
                    focus:function(){
                        $scope.tip.tipShow.arrangeName=0;
                    },
                    blur:function(){
                        if($scope.user.arrangeName||$scope.user.arrangePhone||$scope.user.arrangeId){
                            $scope.tip.tipShow.arrangeName=!$scope.vili.taxName($scope.user.arrangeName);
                        }
                    }
                },
                arrangePhone:{
                    focus:function(){
                        $scope.tip.tipShow.arrangePhone=0;
                    },
                    blur:function(){
                        if($scope.user.arrangeName||$scope.user.arrangePhone||$scope.user.arrangeId){
                            $scope.tip.tipShow.arrangePhone=!$scope.vili.phoneNumber($scope.user.arrangePhone);
                        }
                    }
                },
                arrangeId:{
                    focus:function(){
                        $scope.tip.tipShow.arrangeId=0;
                    },
                    blur:function(){
                        if($scope.user.arrangeName||$scope.user.arrangePhone||$scope.user.arrangeId){
                            $scope.tip.tipShow.arrangeId=!$scope.vili.arrId($scope.user.arrangeId);
                        }
                    }
                },
                tipShow:{
                    payerCode: 0,
                    payerName: 0,
                    artificialName: 0,
                    artificialId: 0,
                    artificialPhone: 0,
                    financeName: 0,
                    financeId: 0,
                    financePhone: 0,
                    arrangeName: 0,
                    arrangeId: 0,
                    arrangePhone: 0,
                    ex:0
                }
            };
            $scope.saveUser=function(){
                $scope.tip.payerCode.blur();
                $scope.tip.payerName.blur();
                $scope.tip.artificialName.blur();
                $scope.tip.artificialPhone.blur();
                $scope.tip.artificialId.blur();
                $scope.tip.financeName.blur();
                $scope.tip.financeId.blur();
                $scope.tip.financePhone.blur();
                if($scope.user.arrangeName||$scope.user.arrangePhone||$scope.user.arrangeId){
                    $scope.tip.arrangeName.blur();
                    $scope.tip.arrangeId.blur();
                    $scope.tip.arrangePhone.blur();
                }
                if(($scope.tip.tipShow.payerCode+$scope.tip.tipShow.payerName+$scope.tip.tipShow.artificialName+$scope.tip.tipShow.artificialId+$scope.tip.tipShow.artificialPhone
                    +$scope.tip.tipShow.financeName+$scope.tip.tipShow.financeId+$scope.tip.tipShow.financePhone+$scope.tip.tipShow.arrangeName+$scope.tip.tipShow.arrangeId+$scope.tip.tipShow.arrangePhone)>0){
                    return;
                }
                if($scope.operation.add && $scope.tip.tipShow.ex){
                    return;
                }
                if($scope.user.artPhotoList.length==0 || $scope.user.finPhotoList.length==0 || ($scope.user.arrPhotoList.length==0 && ($scope.user.arrangeName||$scope.user.arrangePhone||$scope.user.arrangeId))){
                    $("#ajax-alert-info").html($scope.words.taxpayer.choosePic);
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                var formData=new FormData();
                if($scope.operation.add){
                    formData.append("orgCode",$scope.operateOrgInfo);
                }else{
                    formData.append("orgCode",$scope.user.orgCode);
                }
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                formData.append("payerCode",$scope.user.payerCode);
                formData.append("payerName",$scope.user.payerName);
                formData.append("artificialName",$scope.user.artificialName);
                formData.append("artificialPhone",$scope.user.artificialPhone);
                formData.append("artificialId",$scope.user.artificialId);
                formData.append("financeName",$scope.user.financeName);
                formData.append("financePhone",$scope.user.financePhone);
                formData.append("financeId",$scope.user.financeId);
                formData.append("arrangeName",$scope.user.arrangeName);
                formData.append("arrangePhone",$scope.user.arrangePhone);
                formData.append("arrangeId",$scope.user.arrangeId);
                var a;
                $.each($scope.user.artPhotoList,function(k,v){
                    a=1;
                    $.each($scope.artFileList,function(k1,v1){
                        if(v.name==v1.name){
                            a=0;
                            return false;
                        }
                    });
                    if(a){
                        var n=v.name.split("/");
                        var name_str=n[n.length-1];
                        formData.append("artificial",name_str);
                    }
                });
                $.each($scope.user.finPhotoList,function(k,v){
                    a=1;
                    $.each($scope.finFileList,function(k1,v1){
                        if(v.name==v1.name){
                            a=0;
                            return false;
                        }
                    });
                    if(a){
                        var n=v.name.split("/");
                        var name_str=n[n.length-1];
                        formData.append("finance",name_str);
                    }
                });
                $.each($scope.user.arrPhotoList,function(k,v){
                    a=1;
                    $.each($scope.arrFileList,function(k1,v1){
                        if(v.name==v1.name){
                            a=0;
                            return false;
                        }
                    });
                    if(a){
                        var n=v.name.split("/");
                        var name_str=n[n.length-1];
                        formData.append("arrange",name_str);
                    }
                });
                $.each($scope.artFileList,function(k,v){
                    formData.append("artificial",v.file);
                });
                $.each($scope.finFileList,function(k,v){
                    formData.append("finance",v.file);
                });
                $.each($scope.arrFileList,function(k,v){
                    formData.append("arrange",v.file);
                });
                $scope.errTip.disabled=1;
                if($scope.operation.add){
                    $.ajax(
                        {
                            url:$scope.url+getStr_2+"addTaxpayer",
                            method:"POST",
                            async: false,
                            cache: false,
                            data:formData,
                            processData:false,
                            contentType:false,
                            dataType:"json",
                            xhrFields:{withCredentials:true},
                            crossDomain:true,
                            success:addTaxpayerSuc,
                            error:$scope.showMessageErr
                        }
                    );
                }else{
                    $.ajax(
                        {
                            url:$scope.url+getStr_2+"editTaxpayer",
                            method:"POST",
                            async: false,
                            cache: false,
                            data:formData,
                            processData:false,
                            contentType:false,
                            dataType:"json",
                            xhrFields:{withCredentials:true},
                            crossDomain:true,
                            success:editTaxpayerSuc,
                            error:$scope.showMessageErr
                        }
                    );
                }
            }
            function addTaxpayerSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("新增纳税人成功");
                    var str="<li><span class='ell' title='"+$scope.user.payerName+"' ng-click='editTaxpayer("+"$event,"+"\""+$scope.user.payerCode+"\""+")' ng-rightClick='deleteUser($event,"+"\""+$scope.user.payerCode+"\""+",\""+$scope.user.payerName+"\""+")'>"+$scope.user.payerName+"</span></li>";
                    $scope.operateOrgDom.siblings(".user").prepend($compile(str)($scope));
                    $scope.init();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.errTip.disabled=0;
                $scope.show_alert($("#ajax-alert"));
            }
            function editTaxpayerSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("纳税人变更成功");
                    var str="<span class='ell' title='"+$scope.user.payerName+"' ng-click='editTaxpayer("+"$event,"+"\""+$scope.user.payerCode+"\""+")' ng-rightClick='deleteUser($event,"+"\""+$scope.user.payerCode+"\""+",\""+$scope.user.payerName+"\""+")'>"+$scope.user.payerName+"</span>";
                    $scope.operateUserLiDom.html("");
                    $scope.operateUserLiDom.append($compile(str)($scope));
                    $scope.init();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.errTip.disabled=0;
                $scope.show_alert($("#ajax-alert"));
            }
            $scope.user_delete={
                tip:"",
                code:""
            };
            $scope.deleteUser=function($event,payerCode,payerName){
                $scope.init();
                if($("#right").hasClass("hide")){
                    $("#right").removeClass("hide").addClass("show");
                }else if(payerCode == $scope.operateUserInfo){
                    $("#right").removeClass("show").addClass("hide");
                    return;
                }
                $scope.location($("#right"),$event);
                $scope.operateUserInfo=payerCode;
                $scope.operateUserDom=$($event.target);
                $scope.operateUserLiDom=$($event.target).parent();
                $scope.operateUserUlDom=$($event.target).parent().parent();
                $scope.operateUserIconDom=$($event.target).parent().parent().siblings("i");
                var str="";
                str+="<p ng-click='deleteTaxpayer("+"\""+payerCode+"\","+"\""+payerName+"\""+")' ng-bind='words.taxpayer.deleteTaxpayer'></p>";
                $("#right").html("");
                $("#right").append($compile(str)($scope));
            };
            $scope.deleteTaxpayer=function(payerCode,payerName){
                $("#right").html("");
                $("#right").removeClass("show").addClass("hide");
                $scope.operation.delete=1;
                $scope.user_delete.tip="确认删除纳税人"+payerName+"吗？";
                $scope.user_delete.code=payerCode;
            };
            $scope.confirmBtn=function(){
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={payerCode:$scope.user_delete.code};
                $scope.camel.ajax("POST",getStr_2+"deleteTaxpayer",$scope.ajaxData,deleteTaxpayerSuc,$scope.showMessageErr);
            };
            function deleteTaxpayerSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("删除纳税人成功");
                    $scope.operateUserLiDom.remove();
                    $scope.init();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.errTip.disabled=0;
                $scope.show_alert($("#ajax-alert"));
                $scope.$apply();
            }
            $scope.import=function(){
                $scope.init();
                $("#import").click();
            };
            $scope.photoCheck_1 = function (obj,type) {
                if(!obj.files){
                    $("#ajax-alert-info").html("请选择文件");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                var formData=new FormData();
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                formData.append("orgFile",obj.files[0]);
                $.ajax(
                    {
                        url:$scope.url+getStr_2+"importPayer",
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
            $scope.importTip={
                show:0,
                msg:"",
                continueTip:""
            };
            $scope.con={continue:function(){
                $scope.errTip.disabled=1;
                $scope.ajaxData.bizContent={continueTip:$scope.importTip.continueTip};
                $scope.camel.ajax("POST",getStr_2+"conimportPayer",$scope.ajaxData,continueSuc,$scope.showMessageErr);
            }};
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
define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('formalInterviewCtrl', ['$scope', "$rootScope", "$state","$interval","$timeout",
        function ($scope, $rootScope, $state,$interval,$timeout) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
            var getStr="user/";
            var getStr_1="taxpayer/";
            var getStr_2="interview/";
            $scope.continue=0;
            $scope.caseId="";
            $scope.load={show:0};
            $scope.operation={
                add:0,
                edit:0,
                delete:0,
                again:0
            };
            $scope.filter={
                caseName:"",
                payerCode:"",
                orgCode:"",
                search:function(){
                    $scope.interviewList=[];
                    $scope.paginationConf.show=1;
                    $scope.paginationConf.totalItems=0;
                    $timeout(function(){getInterviewRecord();},500);
                }
            };
            $scope.search={
                txt:"",
                nameList:[],
                getNameList:function(){
                    $scope.ajaxData.bizContent={name:$scope.search.txt};
                    $scope.camel.ajax("POST",getStr+"getUserOrgByName",$scope.ajaxData,getNameListSuc,$scope.showMessageErr);
                }
            };
            $scope.payerSearch={
                txt:"",
                nameList:[],
                show:0,
                getNameList:function(){
                    if(!$scope.payerSearch.txt){
                        $scope.payerSearch.nameList=[];
                        return;
                    }
                    $scope.ajaxData.bizContent={payerName:$scope.payerSearch.txt};
                    $scope.camel.ajax("POST",getStr_1+"getPayerByPayerName",$scope.ajaxData,getPayerNameListSuc,$scope.showMessageErr);
                }
            };
            $scope.permisList=[];
            $scope.taxpayer=[];
            $scope.taxpayer_0=[];
            $scope.interviewList=[];
            $scope.meetingInfo={
                beginDate:"",
                meetingId:"",
                payer:[],
                payerCode:"",
                payerName:"请点击选择纳税人",
                caseName:"",
                type_cn:"选择约谈人",
                startDate:"",
                endDate:"",
                settleYear:"",
                recoderCode:""
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
            $scope.init=function(){
                $scope.search.txt="";
                if($("#payerTypeList").hasClass("show")){
                    $("#payerTypeList").removeClass("show").addClass("hide");
                }
                $scope.caseId="";
                $scope.search.nameList=[];
                $scope.payerSearch.show=0;
                $scope.payerSearch.txt="";
                $scope.payerSearch.nameList=[];
                $scope.operation={
                    add:0,
                    edit:0,
                    delete:0,
                    again:0
                };
                $scope.continue=0;
                $scope.taxpayer=[];
                $scope.taxpayer_0=[];
                $scope.meetingInfo={
                    beginDate:"",
                    meetingId:"",
                    payer:[],
                    payerCode:"",
                    payerName:"请点击选择纳税人",
                    caseName:"",
                    type_cn:"选择约谈人",
                    startDate:"",
                    endDate:"",
                    settleYear:"",
                    recoderCode:""
                };
                $scope.payer={payerTypeList:[],payerList:[]};
                $scope.other.count=0;
                $scope.tip.tipShow={
                    payer:0,
                    case:0,
                    dateTime:0,
                    settleYear:0,
                    beginDate:0,
                    recorder:0,
                    payerList:0,
                    host:0
                };
            };
            $scope.addInterview=function(){
                $scope.init();
                $scope.operation.add=1;
                var timer=$interval(function(){
                    if($("#taxpayerList") && $("#taxpayerList").length>0){
                        $("#taxpayerList").removeClass("hide").addClass("show");
                        $interval.cancel(timer);
                    }
                },10);
            }
            function getPermisList(){
                $scope.ajaxData.bizContent={executorCode:$scope.ajaxData.userId};
                $scope.camel.ajax("POST",getStr+"getUserPermis",$scope.ajaxData,getPermisListSuc,$scope.showMessageErr);
            }
            function getPermisListSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.permisList=data.data.orgList;
                    $scope.$apply();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            getPermisList();
            $scope.modifyTax=function($event,v){
                var $dom=$($event.target);
                if($dom.is(":checked")){
                    $scope.taxpayer.push(v);
                    $scope.taxpayer_0.push(v);
                }else{
                    $.each($scope.taxpayer,function(k1,v1){
                        if(v1.executorCode==v.executorCode){
                            $scope.taxpayer.splice(k1,1);
                            return false;
                        }
                    });
                    $.each($scope.taxpayer_0,function(k1,v1){
                        if(v1.executorCode==v.executorCode){
                            $scope.taxpayer_0.splice(k1,1);
                            return false;
                        }
                    });
                }
            }
            $scope.deleteTaxpayer=function(v){
                $.each($scope.taxpayer_0,function(k1,v1){
                    if(v1.executorCode==v.executorCode){
                        $scope.taxpayer_0.splice(k1,1);
                        return false;
                    }
                });
                $.each($scope.taxpayer,function(k1,v1){
                    if(v1.executorCode==v.executorCode){
                        $scope.taxpayer.splice(k1,1);
                        $("ul input:checked").each(function(i){
                            if($(this).val()==v1.executorCode){
                                $(this).removeAttr("checked");
                            }
                        });
                        return false;
                    }
                });
            }
            $scope.payerSearchShowOrHide=function(){
                $scope.tip.tipShow.payer=0;
                $scope.payerSearch.show=!$scope.payerSearch.show;
                $scope.payerSearch.txt="";
                $scope.payerSearch.nameList=[];
                $scope.ajaxData.bizContent={payerName:$scope.payerSearch.txt};
                $scope.camel.ajax("POST",getStr_1+"getPayerByPayerName",$scope.ajaxData,getPayerNameListSuc,$scope.showMessageErr);
            };
            $scope.changePayer=function(v){
                if(!v.payerCode){
                    $scope.payerSearch.nameList=[];
                    return;
                }
                $scope.meetingInfo.payerCode=v.payerCode;
                $scope.meetingInfo.caseName=v.payerName;
                $scope.tip.tipShow.case=0;
                $scope.ajaxData.bizContent={payerCode:v.payerCode};
                $scope.camel.ajax("POST",getStr_1+"getPayerDetail",$scope.ajaxData,getPayerDetailSuc,$scope.showMessageErr);
                $scope.payerSearchShowOrHide();
            }
            function getPayerNameListSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    if(data.data.taxPayer && data.data.taxPayer.length==0 && $scope.payerSearch.txt){
                        $scope.payerSearch.nameList=[{payerCOde:"00000",payerName:"无搜索结果"}];
                    }else{
                        $scope.payerSearch.nameList=data.data.taxPayer;
                    }
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            function getNameListSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    if(data.data.userOrg && data.data.userOrg.length==0 && $scope.search.txt){
                        $scope.search.nameList=[{executorCode:"00000",name:"无搜索结果"}];
                    }else{
                        $scope.search.nameList=data.data.userOrg;
                    }
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            $scope.taxpayerCheck=function(val,code){
                if(!val.orgCode){
                    $scope.search.nameList=[];
                    return;
                }
                $("#taxpayerList input").each(function(i){
                    if(code!=$(this).val()){
                        return;
                    }
                    if($(this).parent().parent().hasClass("hide")){
                        $(this).parent().parent().siblings("div").removeClass("joinClose").addClass("joinOpen");
                        $(this).parent().parent().removeClass("hide").addClass("show");
                    }
                    if(!$(this).is(":checked")){
                        $(this).prop("checked",true);
                        $scope.taxpayer.push(val);
                        $scope.taxpayer_0.push(val);
                    }
                    $scope.search.txt="";
                    $scope.search.getNameList();
                    return false;
                });
            }
            $scope.nextStep=function(){
                if($scope.taxpayer.length==0){
                    $("#ajax-alert-info").html("税局人员不能为空");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                $("#taxpayerList").removeClass("show").addClass("hide");
                $("#payerList").removeClass("hide").addClass("show");
            }
            $scope.prewStep=function(){
                $("#payerList").removeClass("show").addClass("hide");
                $("#taxpayerList").removeClass("hide").addClass("show");
                $.each($scope.taxpayer,function(k,v){
                    $("#taxpayerList input").each(function(i){
                        if(v.executorCode == $(this).val() && !$(this).is(":checked")){
                            $(this).prop("checked",true);
                        }
                    });
                });
            }
            function getInterviewRecord(){
                var formData=new FormData();
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                formData.append("payerCode",$scope.filter.payerCode);
                formData.append("caseName",$scope.filter.caseName);
                // formData.append("settleYear","");
                formData.append("beginDate",$("#startTime").val());
                formData.append("endDate",$("#endTime").val());
                formData.append("pageIndex",$scope.paginationConf.currentPage);
                formData.append("pageSize",$scope.paginationConf.itemsPerPage);
                if($("#orgCode").val()==="00000000000"){
                    $scope.filter.orgCode="00000000000";
                }else{
                    $scope.filter.orgCode=$("#orgCode").val()?$("#orgCode").val():"";
                }
                formData.append("model.orgs[0].orgCode",$scope.filter.orgCode);
                $.ajax(
                    {
                        url:$scope.url+getStr_2+"getInterviewRecord",
                        method:"POST",
                        async: false,
                        cache: false,
                        data:formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        xhrFields:{withCredentials:true},
                        crossDomain:true,
                        success:getInterviewRecordSuc,
                        error:$scope.showMessageErr
                    }
                );
            }
            function getInterviewRecordSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                $scope.paginationConf.show=0;
                if(data && data.status=="SUCCESS"){
                    $scope.paginationConf.totalItems=data.data.interviewCount;
                    var arr=[];
                    var inter=data.data.interview;
                    if(inter && inter.length>0){
                        $.each(inter,function(k,v){
                            var caser={};
                            caser.caseId=v.caseId;
                            caser.caseName=v.caseName;
                            caser.beginDate=v.beginDate.split(" ")[0];
                            caser.endDate=v.endDate.split(" ")[0];
                            caser.caseName=v.caseName;
                            caser.caseId=v.caseId;
                            caser.caseName=v.caseName;
                            caser.payerCode=v.payerCode;
                            caser.modelList=[];
                            if(v.modelList && v.modelList.length>0){
                                $.each(v.modelList,function(k1,v1){
                                    var meeting={};
                                    meeting.meetingId=v1.meeting.meetingId;
                                    meeting.meetingTitle=v1.meeting.meetingTitle;
                                    meeting.interviewDate=v1.meeting.interviewDate?v1.meeting.interviewDate:"----";
                                    meeting.beginDate=v1.meeting.beginDate.split(".")[0];
                                    if(v1.meeting.status==1){
                                        meeting.status="进行中";
                                        meeting.operation=[];
                                    }else if(v1.meeting.status==2){
                                        meeting.status="已结束";
                                        meeting.operation=[];
                                    }else{
                                        meeting.status="未开始";
                                        meeting.operation=["编辑","删除"];
                                    }
                                    meeting.taxpayer=[];
                                    $.each(v1.meetingExes,function(k2,v2){
                                        var exes={};
                                        exes.executorCode=v2.executorCode;
                                        exes.executorName=v2.executorName;
                                        exes.executorType=v2.executorType;
                                        if(v2.executorType==1){
                                            exes.executorType_cn=v2.executorName+"(记录人)";
                                        }else if(v2.executorType==0){
                                            exes.executorType_cn=v2.executorName+"(主持人)";
                                        }else if(v2.executorType=="0,1"){
                                            exes.executorType_cn=v2.executorName+"(主持人、记录人)";
                                        }else{
                                            exes.executorType_cn=v2.executorName;
                                        }
                                        meeting.taxpayer.push(exes);
                                    });
                                    meeting.orgs=v1.orgs;
                                    meeting.orgStr="";
                                    $.each(v1.orgs,function(k3,v3){
                                        if(k3!=v1.orgs.length-1){
                                            meeting.orgStr+=v3.orgRemark+"、";
                                        }else{
                                            meeting.orgStr+=v3.orgRemark;
                                        }
                                    });
                                    meeting.payer=v1.meetingArrs;
                                    meeting.payerList=[];
                                    caser.modelList.push(meeting);
                                })
                            }
                            arr.push(caser);
                        });
                    }
                    $scope.interviewList=arr;
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            getInterviewRecord();
            $scope.continueInterview=function($event,caseId,v){
                $scope.continue=1;
                if(document.body.scrollTop){
                    document.body.scrollTop=0;
                }
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=0;
                }
                var meetingId;
                if(v.modelList && v.modelList.length>0){
                    meetingId=v.modelList[0].meetingId;
                }
                $scope.ajaxData.bizContent={
                    meetingId:meetingId,
                    caseId:caseId
                };
                if(meetingId){
                    editMeeting(caseId,meetingId);
                }else{
                    $("#ajax-alert-info").html("该案件正在进行中或已结束,无法继续约谈");
                    $scope.show_alert($("#ajax-alert"));
                }
            };
            $scope.operate=function($event,caseId,meetingId){
                var $dom=$($event.target);
                $scope.ajaxData.bizContent={
                    meetingId:meetingId,
                    caseId:caseId
                };
                if($dom.html()=="编辑"){
                    editMeeting(caseId,meetingId);
                }else if($dom.html()=="删除"){
                    deleteMeeting(caseId,meetingId);
                }else if($dom.html()=="再次约谈"){
                    interviewAgain(caseId,meetingId);
                }
            };
            function editMeeting(caseId,meetingId){
                if(document.body.scrollTop){
                    document.body.scrollTop=0;
                }
                if(document.documentElement.scrollTop){
                    document.documentElement.scrollTop=0;
                }
                if($scope.continue){
                    $scope.init();
                    $scope.caseId=caseId;
                    $scope.continue=1;
                }else{
                    $scope.init();
                }
                $scope.operation.edit=1;
                var timer=$interval(function(){
                    if($("#payerList") && $("#payerList").length>0){
                        $("#payerList").removeClass("hide").addClass("show");
                        $interval.cancel(timer);
                    }
                },10);
                $scope.camel.ajax("POST",getStr_2+"toContinueInterview",$scope.ajaxData,toContinueInterviewSuc,$scope.showMessageErr);
            }
            function deleteMeeting(caseId,meetingId){
                $scope.init();
                $scope.operation.delete=1;
            }
            function interviewAgain(caseId,meetingId){
                $scope.init();
                $scope.operation.again=1;
            }
            function toContinueInterviewSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    getPermisList();
                    $scope.taxpayer=[];
                    $scope.taxpayer_0=[];
                    if(data.data && data.data.model){
                        $.each(data.data.model.meetingExes,function(k1,v1){
                            var name;
                            if(v1.executorType==0){
                                name=v1.executorName+"(主持人)";
                                $scope.taxpayer_0.push({
                                    executorCode:v1.executorCode,name:v1.executorName,selected:0,selected_1:1
                                });
                            }else if(v1.executorType==1){
                                name=v1.executorName+"(记录人)";
                                $scope.meetingInfo.recoderCode=v1.executorCode;
                                $scope.taxpayer_0.push({
                                    executorCode:v1.executorCode,name:v1.executorName,selected:1,selected_1:0
                                });
                            }else if(v1.executorType=="0,1"){
                                name=v1.executorName+"(主持人、记录人)";
                                $scope.meetingInfo.recoderCode=v1.executorCode;
                                $scope.taxpayer_0.push({
                                    executorCode:v1.executorCode,name:v1.executorName,selected:1,selected_1:1
                                });
                            }else{
                                name=v1.executorName;
                                $scope.taxpayer_0.push({
                                    executorCode:v1.executorCode,name:v1.executorName,selected:0,selected_1:0
                                });
                            }
                            $scope.taxpayer.push({
                                executorCode:v1.executorCode,name:name,executorType:v1.executorType
                            });
                        });
                    }
                    var start=data.data.beginDate.split("-");
                    $scope.meetingInfo.startDate=start[0]+"-"+start[1];
                    var end=data.data.endDate.split("-");
                    $scope.meetingInfo.endDate=end[0]+"-"+end[1];
                    $scope.meetingInfo.beginDate=data.data.model.meeting.beginDate.split(".")[0];
                    $scope.meetingInfo.meetingId=data.data.model.meeting.meetingId;
                    $scope.meetingInfo.caseName=data.data.caseName;
                    $scope.meetingInfo.payerCode=data.data.payerCode;
                    $scope.meetingInfo.payer=[];
                    var str="";
                    $.each(data.data.model.meetingArrs,function(i,val){
                        var phone_cn,name_cn,arrangeType_cn;
                        if(val.arrangeType=="arrange"){
                            phone_cn="办税人员手机";
                            name_cn="办税人员姓名";
                            arrangeType_cn="办税人员";
                        }else if(val.arrangeType=="artificial"){
                            phone_cn="法人手机";
                            name_cn="法人姓名";
                            arrangeType_cn="法人";
                        }else if(val.arrangeType=="finance"){
                            phone_cn="财务负责人手机";
                            name_cn="财务负责人姓名";
                            arrangeType_cn="财务负责人";
                        }else{
                            phone_cn="被约谈人手机号";
                            name_cn="被约谈人姓名";
                            arrangeType_cn="其他人";
                        }
                        if(val.arrangeType=="arrange"||val.arrangeType=="artificial"||val.arrangeType=="finance"){
                            if(i<data.data.model.meetingArrs.length-1){
                                str+=arrangeType_cn+"、";
                            }else{
                                str+=arrangeType_cn;
                            }
                        }
                        $scope.meetingInfo.payer.push({
                            arrangeType:val.arrangeType,
                            arrangeType_cn:arrangeType_cn,
                            name:val.arrangeName,
                            arrangeCard:val.arrangeCard,
                            id:"",
                            phone:val.arrangePhone,
                            phone_cn:phone_cn,
                            name_cn:name_cn
                        });
                    });
                    $scope.meetingInfo.type_cn=str;
                    $scope.ajaxData.bizContent={payerCode:data.data.payerCode};
                    $scope.camel.ajax("POST",getStr_1+"getPayerDetail",$scope.ajaxData,getPayerDetailSuc,$scope.showMessageErr);
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
            }
            $scope.payer={payerTypeList:[],payerList:[]};
            function getPayerDetailSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $scope.meetingInfo.payerName=data.data.payerName;
                    $scope.payer={payerTypeList:[],payerList:[]};
                    if(data.data.arrangeName){
                        $scope.payer.payerTypeList.push({arrangeType:"arrange",arrangeType_cn:"办税人员"});
                        $scope.payer.payerList.push({arrangeType:"arrange",arrangeType_cn:"办税人员",name:data.data.arrangeName,id:data.data.arrangeId,phone:data.data.arrangePhone,phone_cn:"办税人员手机",name_cn:"办税人员姓名",arrangeCard:data.data.arrangeId});
                    }
                    if(data.data.artificialName){
                        $scope.payer.payerTypeList.push({arrangeType:"artificial",arrangeType_cn:"法人"});
                        $scope.payer.payerList.push({arrangeType:"artificial",arrangeType_cn:"法人",name:data.data.artificialName,id:data.data.artificialIdId,phone:data.data.artificialPhone,phone_cn:"法人手机",name_cn:"法人姓名",arrangeCard:data.data.artificialId});
                    }
                    if(data.data.financeName){
                        $scope.payer.payerTypeList.push({arrangeType:"finance",arrangeType_cn:"财务负责人"});
                        $scope.payer.payerList.push({arrangeType:"finance",arrangeType_cn:"财务负责人",name:data.data.financeName,id:data.data.financeId,phone:data.data.financePhone,phone_cn:"财务负责人手机",name_cn:"财务负责人姓名",arrangeCard:data.data.financeId});
                    }
                    var time=$interval(function(){
                        if($("#payerTypeList input") && $("#payerTypeList input").length>0){
                            $.each($scope.meetingInfo.payer,function(k,val){
                                $("#payerTypeList input").each(function(i){
                                    if(val.arrangeType==$(this).val() && !$(this).is(":checked")){
                                        $(this).prop("checked",true);
                                    }
                                });
                            });
                            $interval.cancel(time);
                        }
                    },10);
                }else{
                    $("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
                }
                $scope.$apply();
            }
            $scope.modifyPayer=function($event,arrangeType){
                var $dom=$($event.target);
                var flag=0;
                $.each($scope.meetingInfo.payer,function(k1,v1){
                    if(v1.arrangeType==arrangeType){
                        flag=1;
                        return false;
                    }
                });
                if($dom.is(":checked")){
                    $.each($scope.payer.payerList,function(k,v){
                        if(v.arrangeType==arrangeType && !flag){
                            $scope.meetingInfo.payer.push(v);
                            var str="";
                            $.each($scope.meetingInfo.payer,function(i,val){
                                if(val.arrangeType=="arrange"||val.arrangeType=="artificial"||val.arrangeType=="finance"){
                                    if(i<$scope.meetingInfo.payer.length-1){
                                        str+=val.arrangeType_cn+"、";
                                    }else{
                                        str+=val.arrangeType_cn;
                                    }
                                }
                            });
                            $scope.meetingInfo.type_cn=str;
                            return false;
                        }
                    });
                }else{
                    $.each($scope.meetingInfo.payer,function(k2,v2){
                        if(v2.arrangeType==arrangeType){
                            $scope.meetingInfo.payer.splice(k2,1);
                            var str="";
                            $.each($scope.meetingInfo.payer,function(i,val){
                                if(val.arrangeType=="arrange"||val.arrangeType=="artificial"||val.arrangeType=="finance"){
                                    if(i<$scope.meetingInfo.payer.length-1){
                                        str+=val.arrangeType_cn+"、";
                                    }else{
                                        str+=val.arrangeType_cn;
                                    }
                                }
                            });
                            $scope.meetingInfo.type_cn=str;
                            return false;
                        }
                    });
                }
            }
            $scope.confirmBtn=function(){
                $scope.errTip.disabled=1;
                if($scope.operation.delete){
                    $scope.camel.ajax("POST",getStr_2+"deleteMeeting",$scope.ajaxData,deleteMeetingSuc,$scope.showMessageErr);
                }else if($scope.operation.again){
                    $scope.camel.ajax("POST",getStr_2+"interviewAgain",$scope.ajaxData,interviewAgainSuc,$scope.showMessageErr);
                }
            }
            function deleteMeetingSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("删除成功");
                    $scope.init();
                    $scope.$apply();
                    getInterviewRecord();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
            }
            function interviewAgainSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    $("#ajax-alert-info").html("创建成功");
                    $scope.init();
                    $scope.$apply();
                    getInterviewRecord();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.show_alert($("#ajax-alert"));
                $scope.errTip.disabled=0;
            }
            $scope.choosePayer=function($event){
                $scope.tip.tipShow.payerList=0;
                var $dom=$($event.target);
                if($("#payerTypeList").hasClass("hide")){
                    $("#payerTypeList").removeClass("hide").addClass("show");
                }else{
                    $("#payerTypeList").removeClass("show").addClass("hide");
                }
            }
            $scope.other={
                addOtherPayer:function(){
                    $scope.tip.tipShow.payerList=0;
                    $scope.meetingInfo.payer.push({
                        arrangeType:$scope.meetingInfo.meetingId+"other"+$scope.other.count,
                        arrangeType_cn:"其他人员",
                        arrangeCard:"",
                        name:"",
                        id:"",
                        phone:"",
                        phone_cn:"被约谈人手机号",
                        name_cn:"被约谈人姓名",
                        nameErr:0,
                        phoneErr:0
                    });
                    $scope.other.count++;
                },
                removeOtherPayer:function(arrangeType){
                    $.each($scope.meetingInfo.payer,function(k,v){
                        if(v.arrangeType==arrangeType){
                            $scope.meetingInfo.payer.splice(k,1);
                            return false;
                        }
                    });
                },
                count:0
            };
            $scope.toggle=function($event,v){
                var $dom=$($event.target);
                if($dom.hasClass("joinClose")){
                    $dom.removeClass("joinClose").addClass("joinOpen");
                    if(!$dom.siblings("ul") || $dom.siblings("ul").length==0){
                        return;
                    }
                    $dom.siblings("ul").removeClass("hide").addClass("show");
                }else{
                    $dom.removeClass("joinOpen").addClass("joinClose");
                    if(!$dom.siblings("ul") || $dom.siblings("ul").length==0){
                        return;
                    }
                    $dom.siblings("ul").removeClass("show").addClass("hide");
                }
            };
            $scope.vilidate={
                name:{
                    focus:function(arrangeType,name){
                        $.each($scope.meetingInfo.payer,function(k,v){
                            if(v.arrangeType==arrangeType){
                                v.nameErr=0;
                                return false;
                            }
                        });
                    },
                    blur:function(arrangeType,name){
                        $.each($scope.meetingInfo.payer,function(k,v){
                            if(v.arrangeType==arrangeType){
                                v.nameErr=!$scope.vili.taxName(name);
                                return false;
                            }
                        });
                    }
                },
                phone:{
                    focus:function(arrangeType,name){
                        $.each($scope.meetingInfo.payer,function(k,v){
                            if(v.arrangeType==arrangeType){
                                v.phoneErr=0;
                                return false;
                            }
                        })
                    },
                    blur:function(arrangeType,phone){
                        $.each($scope.meetingInfo.payer,function(k,v){
                            if(v.arrangeType==arrangeType){
                                v.phoneErr=!$scope.vili.phoneNumber(phone);
                                return false;
                            }
                        });
                    }
                }
            };
            $scope.tip={
                payer:{
                    focus:function(){
                        $scope.tip.tipShow.payer=0;
                    },
                    blur:function(){
                        if(!$scope.meetingInfo.payerName||$scope.meetingInfo.payerName=="请点击选择纳税人"){
                            $scope.tip.tipShow.payer=1;
                        }
                    }
                },
                case:{
                    focus:function(){
                        $scope.tip.tipShow.case=0;
                    },
                    blur:function(){
                        if(!$scope.meetingInfo.caseName||$scope.meetingInfo.caseName.length>240){

                            $scope.tip.tipShow.case=1;
                        }
                    }
                },
                settleYear:{
                    focus:function(){
                        $scope.tip.tipShow.settleYear=0;
                    },
                    blur:function(){
                        if(!$scope.meetingInfo.settleYear&&!$("#m_settleYear").val()){
                            $scope.tip.tipShow.settleYear=1;
                        }
                    }
                },
                beginDate:{
                    focus:function(){
                        $scope.tip.tipShow.beginDate=0;
                    },
                    blur:function(){
                        if(!$("#m_beginDate").val()||new Date().getTime()>new Date($("#m_beginDate").val().replace(/-/g,"/")).getTime()){
                            $scope.tip.tipShow.beginDate=1;
                        }
                    }
                },
                dateTime:{
                    focus:function(){
                        $scope.tip.tipShow.dateTime=0;
                    }
                },
                tipShow:{
                    payer:0,
                    case:0,
                    dateTime:0,
                    settleYear:0,
                    beginDate:0,
                    recorder:0,
                    payerList:0,
                    host:0
                }
            };
            $scope.recorderVili=function(){
                if(!$("#recorderCode").val()){
                    $scope.tip.tipShow.recorder=1;
                }else{
                    $scope.tip.tipShow.recorder=0;
                }
            };
            $scope.hostVili=function(){
                if(!$("#hostCode").val()){
                    $scope.tip.tipShow.host=1;
                }else{
                    $scope.tip.tipShow.host=0;
                }
            };
            $scope.createInterview=function(){
                $scope.tip.payer.blur();
                if($scope.tip.tipShow.payer){
                    return;
                }
                $scope.tip.case.blur();
                if($scope.tip.tipShow.case){
                    return;
                }
                $scope.tip.beginDate.blur();
                if($scope.tip.tipShow.beginDate){
                    return;
                }
                if((!$scope.meetingInfo.startDate&&!$("#m_startDate").val())||(!$scope.meetingInfo.endDate&&!$("#m_endDate").val())){
                    $scope.tip.tipShow.dateTime=1;
                }else{
                    var start,end;
                    if($("#m_startDate")&&$("#m_startDate").length>0){
                        start=new Date($("#m_startDate").val()).getTime();
                        end=new Date($("#m_endDate").val()).getTime();
                    }else{
                        start=new Date($scope.meetingInfo.startDate).getTime();
                        end=new Date($scope.meetingInfo.endDate).getTime();
                    }
                    if(start>end){
                        $scope.tip.tipShow.dateTime=1;
                    }else{
                        $scope.tip.tipShow.dateTime=0;
                    }
                }
                if($scope.tip.tipShow.dateTime){
                    return;
                }
                $scope.tip.beginDate.blur();
                if($scope.tip.tipShow.beginDate){
                    return;
                }
                if(!$("#recorderCode").val()){
                    $scope.tip.tipShow.recorder=1;
                }
                if($scope.tip.tipShow.recorder){
                    return;
                }
                if(!$("#hostCode").val()){
                    $scope.tip.tipShow.host=1;
                }
                if($scope.tip.tipShow.host){
                    return;
                }
                var flag=0;
                if($scope.meetingInfo.payer.length==0){
                    flag=1;
                    $("#ajax-alert-info").html("请添加被约谈人");
                }else{
                    $.each($scope.meetingInfo.payer,function(k,v){
                        v.nameErr=!$scope.vili.taxName(v.name);
                        v.phoneErr=!$scope.vili.phoneNumber(v.phone);
                        if(v.nameErr || v.phoneErr){
                            flag=1;
                            $("#ajax-alert-info").html("请输入正确的姓名与手机号");
                            return false;
                        }
                    });
                }
                if(flag){
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                var formData=new FormData();
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                formData.append("payerCode",$scope.meetingInfo.payerCode);
                formData.append("caseName",$scope.meetingInfo.caseName);
                formData.append("operateUser",$scope.ajaxData.userId);
                formData.append("model.meeting.beginDate",$("#m_beginDate").val());
                var count_i=0;
                $.each($scope.taxpayer,function(i5,val5){
                    formData.append("model.meetingExes["+count_i+"].executorCode",val5.executorCode);
                    var str="";
                    if(val5.executorCode==$("#hostCode").val() && val5.executorCode==$("#recorderCode").val()){
                        str+="0,1";
                    }else if(val5.executorCode==$("#hostCode").val() && val5.executorCode!=$("#recorderCode").val()){
                        str+="0";
                    }else if(val5.executorCode!=$("#hostCode").val() && val5.executorCode==$("#recorderCode").val()){
                        str+="1";
                    }else{
                        str+="2";
                    }
                    formData.append("model.meetingExes["+count_i+"].executorType",str);
                    formData.append("model.meetingExes["+count_i+"].executorName",val5.name.split("(")[0]);
                    count_i++;
                });
                var count_j=0;
                $.each($scope.meetingInfo.payer,function(i6,val6){
                    formData.append("model.meetingArrs["+count_j+"].arrangeType",val6.arrangeType);
                    formData.append("model.meetingArrs["+count_j+"].arrangeName",val6.name);
                    formData.append("model.meetingArrs["+count_j+"].arrangePhone",val6.phone);
                    formData.append("model.meetingArrs["+count_j+"].arrangeCard",val6.arrangeCard);
                    count_j++;
                });
                $scope.errTip.disabled=1;
                if($scope.operation.add){
                    formData.append("beginDate",$("#m_startDate").val());
                    formData.append("endDate",$("#m_endDate").val());
                    addCase(formData);
                }else if($scope.continue){
                    formData.append("model.meeting.meetingId",$scope.meetingInfo.meetingId);
                    formData.append("caseId",$scope.caseId);
                    continueCase(formData);
                }else{
                    formData.append("model.meeting.meetingId",$scope.meetingInfo.meetingId);
                    editCase(formData);
                }
            }
            function addCase(formData){
                $.ajax(
                    {
                        url:$scope.url+getStr_2+"createInterview",
                        method:"POST",
                        async: false,
                        cache: false,
                        data:formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        xhrFields:{withCredentials:true},
                        crossDomain:true,
                        success:createInterviewSuc,
                        error:$scope.showMessageErr
                    }
                );
            }
            function continueCase(formData){
                $.ajax(
                    {
                        url:$scope.url+getStr_2+"continueInterview",
                        method:"POST",
                        async: false,
                        cache: false,
                        data:formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        xhrFields:{withCredentials:true},
                        crossDomain:true,
                        success:createInterviewSuc,
                        error:$scope.showMessageErr
                    }
                );
            }
            function editCase(formData){
                $.ajax(
                    {
                        url:$scope.url+getStr_2+"editInterview",
                        method:"POST",
                        async: false,
                        cache: false,
                        data:formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        xhrFields:{withCredentials:true},
                        crossDomain:true,
                        success:createInterviewSuc,
                        error:$scope.showMessageErr
                    }
                );
            }
            function createInterviewSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
                if(data && data.status=="SUCCESS"){
                    var str="";
                    if($scope.operation.add){
                        str="创建约谈成功";
                    }else if($scope.continue){
                        str="继续约谈成功";
                    }else{
                        str="修改约谈成功";
                    }
                    $("#ajax-alert-info").html(str);
                    $scope.init();
                    $scope.paginationConf.currentPage=1;
                    getInterviewRecord();
                }else{
                    $("#ajax-alert-info").html(data.detail);
                }
                $scope.errTip.disabled=0;
                $scope.show_alert($("#ajax-alert"));
            }
            $scope.siblingsShow=function($event,words){
                    var str="<div>";
                    str+=words;
                    str+="</div>";
                    $("#right_1").html("");
                    $scope.location_1($("#right_1"),$event,0,0);
                    $("#right_1").html(str);
                    $("#right_1").css("background","#eee");
                    $("#right_1").removeClass("hide").addClass("show");
            };
            $scope.tag={
                show:0,
                hide:0
            };
            $scope.siblingsShow_1=function($event,payer){
                    $("#right_1").html("");
                    $scope.location_1($("#right_1"),$event,0,0);
                    var str="<ul>";
                    $.each(payer,function(k,v){
                        if(v.executorType_cn){
                            str+="<li>"+v.executorType_cn+"</li>";
                        }else{
                            str+="<li>"+v.arrangeName+"&nbsp;&nbsp;"+v.arrangePhone+"</li>";
                        }
                    })
                    str+="</ul>";
                    $("#right_1").append(str);
                    $("#right_1").css("background","#eee");
                    $("#right_1").removeClass("hide").addClass("show");
            };
            $scope.siblingsHide=function($event){
                $timeout(function(){
                    $("#right_1").html("");
                    $("#right_1").css("background","#fff");
                    $("#right_1").removeClass("show").addClass("hide");
                },50);
            };
            $scope.color=function(){
                if($("#orgCode").val() || $("#orgCode").val()==="00000000000"){
                    $("#orgCode").css("color","#000");
                }else{
                    $("#orgCode").css("color","#999")
                }
            }
        }
    ])
});
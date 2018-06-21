define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('formalInfoCtrl', ['$scope', "$rootScope", "$state","$interval","$timeout",
        function ($scope, $rootScope, $state,$interval,$timeout) {
            if(!sessionStorage.getItem("userId")){
                $state.go("login");
                return;
            }
            $scope.removeRight();
            var getStr="user/";
            var getStr_1="taxpayer/";
            var getStr_2="interview/";
            var getStr_3="upload/";
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
                    $scope.ajaxData.bizContent={name:$scope.payerSearch.txt};
                    $scope.camel.ajax("POST",getStr_1+"getPayerByPayerName",$scope.ajaxData,getPayerNameListSuc,$scope.showMessageErr);
                }
            };
            $scope.permisList=[];
            $scope.taxpayer=[];
            $scope.taxpayer_0=[];
            $scope.interviewList=[];
            $scope.permisList=[];
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
            $scope.operation={
            	vedio:0,
            	doc:0,
            	data:0
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
            	$scope.operation={
	            	vedio:0,
	            	doc:0,
	            	data:0
	            };
                $scope.meetingId="";
            };
            function getInterviewRecord(){
                var formData=new FormData();
                formData.append("client",$scope.ajaxData.client);
                formData.append("token",$scope.ajaxData.token);
                formData.append("userId",$scope.ajaxData.userId);
                formData.append("payerCode",$scope.filter.payerCode);
                formData.append("caseName",$scope.filter.caseName);
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
                formData.append("model.dataView.viewFlag","true");
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
                            // caser.settleYear=v.settleYear;
                            caser.payerCode=v.payerCode;
                            caser.modelList=[];
                            if(v.modelList && v.modelList.length>0){
                                $.each(v.modelList,function(k1,v1){
                                    var meeting={};
                                    meeting.meetingId=v1.meeting.meetingId;
                                    meeting.meetingTitle=v1.meeting.meetingTitle;
                                    meeting.interviewDate=v1.meeting.interviewDate?v1.meeting.interviewDate:"----";
                                    meeting.beginDate=v1.meeting.beginDate.split(".")[0];
                                    meeting.operation=[];
                                    if(v1.dataView.vedioFlag=="true"){
                                        meeting.operation.push({type:0,word:"视频查看"});
                                    }
                                    if(v1.dataView.recordFlag=="true"){
                                        meeting.operation.push([{type:1,word:"笔录查看"},{type:1,word:"/副本上传"}]);
                                    }
                                    if(v1.dataView.dataFlag=="true"){
                                        meeting.operation.push({type:2,word:"资料查看"});
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
            $scope.siblingsShow=function($event,words){
                $scope.location_1($("#right_1"),$event,0,0);
                var str="<div>";
                str+=words;
                str+="</div>"
                $("#right_1").html(str);
                $("#right_1").css("background","#eee");
                $("#right_1").removeClass("hide").addClass("show");
            };
            $scope.siblingsShow_1=function($event,payer){
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
                $("#right_1").html("");
                $("#right_1").css("background","#fff");
                $("#right_1").removeClass("show").addClass("hide");
            }
            $scope.fileList=[];
            $scope.meetingId="";
            $scope.operate=function($event,word,type,meetingId){
            	if(word=="/副本上传"){
            		$scope.meetingId=meetingId;
            		upload($event,word,type,meetingId);
            		return;
            	}
            	$scope.init();
            	if(word=="视频查看"){
            		$scope.operation.vedio=1;
            	}
            	if(word=="笔录查看"){
            		$scope.operation.doc=1;
            	}
            	if(word=="资料查看"){
            		$scope.operation.data=1;
            	}
                $scope.meetingId=meetingId;
            	$scope.ajaxData.bizContent={};
            	$scope.ajaxData.bizContent.meetingId=meetingId;
            	$scope.ajaxData.bizContent.dataType=type;
            	$scope.camel.ajax("POST",getStr_2+"viewData",$scope.ajaxData,viewDataSuc,$scope.showMessageErr);
            }
            function viewDataSuc(data){
            	if(data && data.status=="SUCCESS"){
            		if(data.data.fileList.length==0){
            			$scope.fileList=[];
            		}
            		var fileList=[];
            		$.each(data.data.fileList,function(k,v){
            			v.fileSize_cn=size(v.fileSize);
            			v.uploadTime_cn=time(v.uploadTime);
            			fileList.push(v);
            		});
            		$scope.fileList=fileList;
            	}else{
            		$("#ajax-alert-info").html(data.detail);
                    $scope.show_alert($("#ajax-alert"));
            	}
            	$scope.$apply();
            }
            function size(num){
            	if(num<1024){
            		return num+"B";
            	}else if(num/1024<1024){
            		return (num/1024).toFixed(2)+"KB";
            	}else if(num/1024/1024<1024){
            		return (num/1024/1024).toFixed(2)+"MB";
            	}
            }
            function time(time){
            	var t=new Date(time);
            	var y=t.getFullYear();
            	var m=t.getMonth()+1>10?t.getMonth()+1:"0"+(t.getMonth()+1);
            	var d=t.getDate()>10?t.getDate():"0"+t.getDate();
            	var h=t.getHours()>10?t.getHours():"0"+t.getHours();
            	var mi=t.getMinutes()?t.getMinutes():"00";
            	return y+"."+m+"."+d+" "+h+":"+mi;
            }
            function upload($event,word,type,meetingId){
            	$($event.target).siblings("input").click();
           	}
           	$scope.file=[];
           	$scope.photoCheck = function (obj) {
                if(!obj.files){
                    $("#ajax-alert-info").html("请选择要上传的文件");
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                $scope.file=[];
                for(var i=0;i<obj.files.length;i++){
                	$scope.file.push(obj.files[i]);
                }
                var uuid = "";
                for (i = 0; i < 32; i++) { uuid += Math.floor(Math.random() * 16).toString(16); }
                var formData=new FormData();
                formData.append("meetingId",$scope.meetingId);
                formData.append("sub_path","inter_rec/"+$scope.meetingId);
                formData.append("fileType","record");
                formData.append("operateUser",$scope.ajaxData.userId);
                formData.append("callback","/upload_callback");
                formData.append("file",obj.files[0]);
                $.ajax(
                    {
                        url:"http://192.168.100.13/uploadFile?X-Progress-ID="+uuid,
                        method:"POST",
                        async: false,
                        cache: false,
                        data:formData,
                        processData:false,
                        contentType:false,
                        dataType:"json",
                        xhrFields:{withCredentials:true},
                        crossDomain:true,
                        success:shareFileSuc,
                        error:shareFileErr
                    }
                );
                $(obj).val("");
            };
            function shareFileSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
            	$scope.file=[];
            	$scope.meetingId="";
            	if(data && data.status=="SUCCESS"){
            		$("#ajax-alert-info").html("副本上传成功");
            	}else{
            		$("#ajax-alert-info").html(data.detail);
            	}
            	$scope.show_alert($("#ajax-alert"));
            }
            function shareFileErr(xhr,status,err){
                console.log(status);
                $scope.file=[];
                $scope.meetingId="";
            }
            $scope.selAll=function($event){
            	var $dom=$($event.target);
            	if($dom.is(":checked")){
            		$("#fileTable tbody input").each(function(i){
            			$(this).prop("checked",true);
            		});
            	}else{
            		$("#fileTable tbody input").each(function(i){
            			$(this).removeAttr("checked");
            		});
            	}
            }
            $scope.sel=function($event,name){
            	var $dom=$($event.target);
            	var flag=1;
            	if($dom.is(":checked")){
            		$("#fileTable tbody input").each(function(i){
	            		if(!$(this).is(":checked")){
	        				flag=0;
	        				return false;
	        			}
	        		});
	        		if(flag){
	        			$("#fileTable thead input").prop("checked",true);
	        		}
            	}else{
            		$("#fileTable thead input").each(function(i){
            			if($(this).is(":checked")){
            				$(this).removeAttr("checked");
            			}
            		});
            	}
            }
            $scope.downLoad=function(){
                var arr=[];
                $("#fileTable tbody input").each(function(i){
                    if($(this).is(":checked")){
                        var me=this;
                        $.each($scope.fileList,function(k,v){
                            if(v.fileName==$(me).val()){
                                arr.push(v.fileName);
                            }
                        });
                    }
                });
                if(arr.length==0){
                    $("#ajax-alert-info").html($scope.words.formalInfo.chooseData);
                    $scope.show_alert($("#ajax-alert"));
                    return;
                }
                var myform = $("<form></form>");;
                myform.attr('method','post');
                myform.attr('action',$scope.url+getStr_2+"downLoad");;
                var client = $("<input type='hidden' name='client'/>")
                client.attr('value',"");
                var token = $("<input type='hidden' name='token'/>")
                token.attr('value',"");
                var userID = $("<input type='hidden' name='userID' />")
                userID.attr('value',sessionStorage.getItem("userId"));
                var meetingId = $("<input type='hidden' name='meetingId' />")
                meetingId.attr('value',$scope.meetingId);
                var dataType = $("<input type='hidden' name='dataType' />")
                if($scope.operation.vedio){
                    dataType.attr('value',0);
                }else if($scope.operation.doc){
                    dataType.attr("value",1);
                }else{
                    dataType.attr("value",2);
                }
                $.each(arr,function(k,v){
                    var fileName = $("<input type='hidden' name='fileName' />")
                    fileName.attr('value',v);
                    myform.append(fileName);
                });
                myform.append(client);
                myform.append(token);
                myform.append(userID);
                myform.append(meetingId);
                myform.append(dataType);
                myform.appendTo('body').submit();
                $scope.init();
            }
            function downLoadSuc(data){
                if(data && data.data && (data.data.resultCode==40004||data.data.resultCode==40038)){
                    $("#ajax-alert-info").html(data.data.resultMsg);
                    $scope.show_alert($("#ajax-alert"));
                    $scope.timeout();
                    return;
                }
            	if(data && data.status=="SUCCESS"){
                    $scope.init();
            	}else{
            		$("#ajax-alert-info").html(data.detail);
            		$scope.show_alert($("#ajax-alert"));
            	}
                $scope.errTip.disabled=0;
            }
            $scope.color=function(){
                if($("#orgCode").val() || $("#orgCode").val()==="00000000000"){
                    $("#orgCode").css("color","#000");
                }else{
                    $("#orgCode").css("color","#999")
                }
            };
            $scope.downllll=function(){
                var elemIF = document.createElement("iframe");
                elemIF.src = "http://192.168.100.13/files/tax/1001/20060218/a32f7acf6f3e157c9c5245430047923e.txt";
                document.body.appendChild(elemIF);
            }
        }
    ])
});
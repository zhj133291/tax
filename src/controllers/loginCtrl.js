define(['app', 'services/vilidateService', 'services/httpService'], function (app, vilidate, httpService) {
    app.controller('loginCtrl', ['$scope', "$rootScope", "$state",
        function ($scope, $rootScope, $state) {
            var str="user/";
            $scope.uuid="";
            $scope.img={imgUrl:""};
            function uuid(){
                var uuid="";
                for(var i=0;i<32;i++){
                    uuid+=Math.floor(Math.random()*16).toString(16);
                }
                return uuid;
            }
            $scope.getImg=function(){
                $scope.uuid=uuid();
                $scope.camel.ajax("POST",str+"getVerifyImg",{
                    "client": "",
                    "bizContent": {
                        uuid:$scope.uuid
                    }},getImgSuc,getImgErr);
            }
            function getImgSuc(data){
                if (data && data.status=="SUCCESS") {
                    $scope.img.imgUrl=data.data.verifyImg;
                }else{

                }
            }
            function getImgErr(x,y,z){
                console.log(y);
            }
            $scope.getImg();
            $scope.user={
            	name:"",
            	pwd:"",
                nameTip:"",
                pwdTip:"",
                num:"",
                numTip:"",
            	nameErr:0,
            	pwdErr:0,
                numErr:0,
            	nameVili:{
            		focus:function(){
                        $scope.xhr.show=0;
            			$scope.user.nameErr=0;
            		},
            		blur:function(){
            			$scope.user.nameErr=!$scope.vili.loginName($scope.user.name);
                        if(!$scope.user.nameErr){
                            return;
                        }
                        $scope.user.pwdErr=0;
                        if(!$scope.user.name){
                            $scope.user.nameTip="请输入账号";
                        }else{
                            $scope.user.nameTip="账号或密码不正确，请重新输入";
                        }
            		}
            	},
            	pwdVili:{
            		focus:function(){
                        $scope.xhr.show=0;
            			$scope.user.pwdErr=0;
            		},
            		blur:function(){
                        $scope.user.nameErr=!$scope.vili.loginName($scope.user.name);
                        if($scope.user.nameErr){
                            if(!$scope.user.name){
                                $scope.user.nameTip="请输入账号";
                            }else{
                                $scope.user.nameTip="账号或密码不正确，请重新输入";
                            }
                            return;
                        }
            			$scope.user.pwdErr=!$scope.vili.loginPwd($scope.user.pwd);
                        if(!$scope.user.pwdErr){
                            return;
                        }
                        if(!$scope.user.pwd){
                            $scope.user.pwdTip="请输入密码";
                        }else{
                            $scope.user.pwdTip="账号或密码不正确，请重新输入";
                        }
            		}
            	},
                numVili:{
                    focus:function(){
                        $scope.xhr.show=0;
                        $scope.user.numErr=0;
                    },
                    blur:function(){
                        $scope.user.nameErr=!$scope.vili.loginName($scope.user.name);
                        if($scope.user.nameErr){
                            if(!$scope.user.name){
                                $scope.user.nameTip="请输入账号";
                            }else{
                                $scope.user.nameTip="账号或密码不正确，请重新输入";
                            }
                            return;
                        }
                        $scope.user.pwdErr=!$scope.vili.loginPwd($scope.user.pwd);
                        if($scope.user.pwdErr){
                            if(!$scope.user.pwd){
                                $scope.user.pwdTip="请输入密码";
                            }else{
                                $scope.user.pwdTip="账号或密码不正确，请重新输入";
                            }
                            return;
                        }
                        if(!$scope.user.num){
                            $scope.user.numErr=1;
                            $scope.user.numTip="请输入验证码";
                        }
                    }
                }
            };
            $scope.login = function () {
            	$scope.user.nameVili.blur();
                if($scope.user.nameErr){
                    return;
                }
            	$scope.user.pwdVili.blur();
            	if($scope.user.nameErr+$scope.user.pwdErr+$scope.xhr.show>0){
            		return;
            	}
                $scope.user.numVili.blur();
                if($scope.user.nameErr+$scope.user.pwdErr+$scope.user.numErr+$scope.xhr.show>0){
                    return;
                }
                $scope.errTip.disabled=1;
                $scope.camel.ajax("POST", str+"login", {
                    "client": "web",
                    "bizContent": {
                        userName:$scope.user.name,
                        passWord:$scope.user.pwd,
                        uuid:$scope.uuid,
                        verifyCode:$scope.user.num
                    }
                }, loginSuc,loginErr);
            };
            $scope.xhr={
                show:0,
                tip:""
            };
            function loginSuc(data) {
                if (data && data.status=="SUCCESS") {
                    window.userInfo = data.data.loginInfo;
                    sessionStorage.setItem("userName", data.data.loginInfo.userName);
                    sessionStorage.setItem("userId", data.data.loginInfo.userId);
                    sessionStorage.setItem("name", data.data.loginInfo.name);
                    $state.go("home.homeIndex");
                }else{
                    if(data.data && data.data.resultCode=="40006"){
                        $scope.xhr.tip=$scope.words.accoutErr;
                    }else if(data.data && data.data.resultCode=="40032"){
                        $scope.xhr.tip=$scope.words.login.numErr;
                    }else if(data.data && data.data.resultCode=="40033"){
                        $scope.xhr.tip=$scope.words.login.numtimeOut;
                    }else if(data.data && data.data.resultCode=="40035"){
                        $scope.xhr.tip=data.data.resultMsg;
                    }else{
                        $scope.xhr.tip=$scope.words.loginErrTip;
                    }
                    $scope.xhr.show=1;
                    $scope.getImg();
                }
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
            function loginErr(jqXHR, textStatus, errorThrown) {
                $scope.xhr.tip=$scope.words.loginErrTip;
                $scope.xhr.show=1;
                $scope.errTip.disabled=0;
                $scope.$apply();
            }
        }
    ])
});
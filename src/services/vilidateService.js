define([],function(){
	"user strict";
	function vilidate(){
	}
	vilidate.prototype.phoneNumber=function(data){
			var myreg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
			return myreg.test(data);
	}
	vilidate.prototype.passWord=function(data){
			// var myreg = /\S+/;
			var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			// var myreg = /^[a-zA-Z0-9]{6,20}$/;
			return myreg.test(data);
	}
	vilidate.prototype.passWord_1=function(data){
			// var myreg = /\S+/;
			// var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			var myreg = /^[a-zA-Z0-9]+/;
			return myreg.test(data);
	}
	vilidate.prototype.validateCodeReg=function(data){
		var myreg=/[0-9]{6}/;
		return myreg.test(data);
	}
	vilidate.prototype.name=function(data){
		var myreg=/^[\u4E00-\u9FA5]{2,15}$/;
		return myreg.test(data);
	}
	vilidate.prototype.identifyID=function(data){
		var myreg1=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		var myreg2=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
		return myreg1.test(data)||myreg2.test(data);
	}
	vilidate.prototype.mail=function(data){
		var myreg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		return myreg.test(data);
	}
	vilidate.prototype.fee=function(data){
		var myreg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		return myreg.test(data);
	}
	vilidate.prototype.taxName=function(data){
		var myreg=/^[a-zA-Z\u4e00-\u9fa5][ a-zA-Z\u4e00-\u9fa5]{0,48}[a-zA-Z\u4e00-\u9fa5]$/;
		return myreg.test(data);
	}
	vilidate.prototype.executorCode=function(data){
		var myreg=/^\d{1,11}$/;
		return myreg.test(data);
	}
	vilidate.prototype.executorCode_1=function(data){
		var myreg=/^\d{11}$/;
		return myreg.test(data);
	}
	vilidate.prototype.loginName=function(data){
		// var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,8}$/;
		var myreg=/^[a-zA-Z0-9]{1,8}$/;
		return myreg.test(data);
	}
	vilidate.prototype.loginPwd=function(data){
		var myreg=/^[ a-zA-Z0-9_]{1,20}$/;
		return myreg.test(data);
	}
	vilidate.prototype.loginPwd_1=function(data){
		var myreg=/^[ a-zA-Z0-9_]{1,20}$/;
		return myreg.test(data);
	}
	vilidate.prototype.payerCode=function(data){
		var myreg=/^[a-zA-Z0-9]{18}$/;
		return myreg.test(data);
	}
	vilidate.prototype.payerName=function(data){
		var myreg=/^[a-zA-Z0-9\u4e00-\u9fa5]{1,50}$/;
		return myreg.test(data);
	}
	vilidate.prototype.arrId=function(data){
		var myreg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return myreg.test(data);
	}
	vilidate.prototype.roleName=function(data){
		var myreg=/^.{1,64}$/;
		return myreg.test(data);
	}
	vilidate.prototype.orgName=function(data){
		var myreg=/^[\u4e00-\u9fa5]{1,150}$/;
		return myreg.test(data);
	}
	vilidate.prototype.orgCode=function(data){
		var myreg=/^\d{11}$/;
		return myreg.test(data);
	}
	return vilidate;
})
// function phoneNumberStr(target) {
// 	target = (target + "").replace(/,/, "");
// 	var s = target.substring('0', '3');
// 	var e = target.substring('7', '11');
// 	return (s + "****" + e)
// }
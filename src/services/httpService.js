define([],function(){
    var camel=function(){
    }
    camel.prototype.ajax=function(m,method,d,s,e){
    	return $.ajax({
	        method:m,
	        url:'https://192.168.100.118:8443/tax/'+method, //'https://192.168.100.224:8443/tax/',
	        data:JSON.stringify(d),
	        ContentType:"application/json;charset=utf-8",
	        dataType:"json",
	        xhrFields:{withCredentials:true},
	        crossDomain:true,
	        success:s,
	        error:e
    	})
    };
    return camel;
})
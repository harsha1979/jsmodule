function WTS(){
	this.type='WTS';
	
	this.imports = new Array();
	this.detectBrowser();
	
	this.obj = new Object();
	this.obj.isOpened = false ;
	this.obj.isDebugMode = false; 

	var scripts = document.scripts ;
	if(!scripts){
		var ha = document.getElementsByTagName("head")[0];
		scripts = ha.getElementsByTagName('script');
	}
	for(var index=0; index<scripts.length; index++) {
		if(scripts[index].src && scripts[index].src.match("wts.js"+'^')==null){
			var url = scripts[index].src.replace("lk/wts/wts.js","");
			document.write("<script  type='text/javascript'>var baseURL='"+url+"';</script>");
		}
	}
	this.using('lk.wts.lang.*;');
}

WTS.prototype.detectBrowser=function(){
	this.browser=navigator.appName;
	this.version=parseFloat(navigator.appVersion);
	if(this.browser == "Microsoft Internet Explorer"){
		this.isIE = true ;
	}
}

WTS.prototype.baseURL=function(url){
	//document.write("<script  type='text/javascript'>var baseURL='"+url+"';</script>");
}

WTS.prototype.using=function(js){
	//wts.debug("jspath");
	
	
	var jspath = js.replace('.*','/using').replace(/\./ig,'/').replace(';','')+".js";
	var urlEdit =  baseURL+"/"+jspath ;
	
	for(var index=0; index<this.imports.length; index++) {
		var imp = this.imports[index];
		if(imp==urlEdit){
			return null;
		}
	}
	this.imports.push(urlEdit);
	
	document.writeln("<script  type='text/javascript'  src='"+urlEdit+"'> </script>");
	
	//window.location.reload()
	
	//this.imports.push(baseURL+"/"+jspath);
	//wts.appendJS(baseURL+"/"+jspath);	
}
WTS.prototype.usingExternal=function(js){
	//wts.debug("jspath");
	var jspath = js.replace('.*','/using').replace(/\./ig,'/').replace(';','')+".js";
	//var extPath = baseURL.replace("/jsmodule/","").replace("/jsmodule","").replace("jsmodule/","").replace("jsmodule","");
	var extPath = baseURL.replace("jsmodule/","").replace("jsmodule","")+jspath;
	/*if(extPath!=""){
		extPath+="/"+jspath ;
	}else{
		extPath+=jspath ;
	}*/
	for(var index=0; index<this.imports.length; index++) {
		var imp = this.imports[index];
		if(imp==extPath){
			return null;
		}
	}
	this.imports.push(extPath);
	document.writeln("<script  type='text/javascript'  src='"+extPath+"'> </script>");
	//window.location.reload()
	
	//this.imports.push(baseURL+"/"+jspath);
	//wts.appendJS(baseURL+"/"+jspath);	
}
WTS.prototype.appendJS=function(src){
	
	var script = document.createElement('script');
	script.setAttribute('src',src);
	script.setAttribute('type','text/javascript');
	var headID = document.getElementsByTagName("head")[0];
	//wts.debug("src");
	//wts.debug(src);
	var loaded = false;
	var loadFunction = function()
	{
		if (loaded){
			return;
		}
		loaded=true;
		//alert('your JS file is now loaded');
	};
	//script.onload = loadFunction;
	script.onreadystatechange = loadFunction;
	
	headID.appendChild(script);
}
WTS.prototype.debugMode=function(mode){
	this.obj.isDebugMode = mode ;
	if(this.obj.isDebugMode){
		this.showDebug();
	}
}
WTS.prototype.showDebug=function(){
	var ret = window.showModelessDialog(baseURL+"/lk/wts/debug.html",window,"dialogLeft:900px;dialogTop:0px;status:false;dialogWidth:400px;dialogHeight:300px;edge:sunken;help:no;scroll:no;");
	return ret ;
}
WTS.prototype.debug=function(message){
	if(this.obj.isDebugMode){
		var ret = null ;
		this.obj.message = message ;
		if(!this.obj.isOpened){
			//this.showDebug();
		}else{
			this.obj.debug.call();
		}
	}
}
WTS.prototype.info=function(message){
	if(this.obj.isDebugMode){
		var ret = null ;
		this.obj.message = message ;
		if(!this.obj.isOpened){
			//this.showDebug();
		}else{
			this.obj.info.call();
		}
	}
}
WTS.prototype.error=function(message){
	if(this.obj.isDebugMode){
		var ret = null ;
		this.obj.message = message ;
		if(!this.obj.isOpened){
			//this.showDebug();
		}else{
			this.obj.error.call();
		}
	}
}
WTS.prototype.warning=function(message){
	if(this.obj.isDebugMode){
		var ret = null ;
		this.obj.message = message ;
		if(!this.obj.isOpened){
			//this.showDebug();
		}else{
			this.obj.warning.call();
		}
	}
}
WTS.prototype.attachedEventCBrowser=function(object,eventName,method,isAttach){
	var wtsInternalEvent=function(evt){
		if(wts.isIE){
			evt = window.event;
		}else{
			eventMappingCrossBrowser(evt);
		}
		
		var methodArray = this["wts_"+evt.type.replace("on","")];
		if(methodArray){
			for(var index=methodArray.length; index>0; index--) {
				this["wts_method"]=methodArray[index-1];
				this["wts_method"](evt);
			}
		}
	}
	var eventMappingCrossBrowser=function(evtMapping){
		evtMapping.srcElement = evtMapping.target ;
	}
	
	var wtsEventReg = object["wts_"+eventName.replace("on","")];
	if(wtsEventReg && isAttach){
		wtsEventReg.push(method);
	}else{
		object["wts_"+eventName.replace("on","")] = new Array(method) ;
		if(isAttach){
			if(wts.isIE){
				object.attachEvent(eventName,wtsInternalEvent);
			}else{
				object.addEventListener(eventName.replace("on",""), wtsInternalEvent, false);
			}
		}else{
			object[eventName] = wtsInternalEvent ;
		}
	}
}
var wts = new WTS();
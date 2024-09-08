function AJAXController(controller){
	this.type ='AJAXController';
	this.controller = controller ;
	this.req = null ;
}



AJAXController.prototype.getConnection=function(){
	var pXmlreq = false ;
	if (window.XMLHttpRequest) {
		pXmlreq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			pXmlreq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) {
			try {
				pXmlreq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
			}
		}
	}
	//pXmlreq.reference = this ;
	return pXmlreq ;
}


AJAXController.prototype.sendRequest=function(responsetype , service , query , method , async , contenttype,asyncMethod){
	this.responsetype =responsetype ;
	this.req = this.getConnection();
	var request=this.req;

	var controller=this;

	if(!method){
		method="GET";
	}
	if(async!=true){
		async=false;

	}else{
		if(asyncMethod){

			async=true;			
			request.onreadystatechange = function(){				
				//this.ajaxAsyncMethod ;
				if(request.readyState==4 && request.status == 200){
					if(controller.responsetype=='text'){
						controller.userAsyncMethod(request.responseText);
					}else{
						controller.userAsyncMethod(request.responseXML);
					}
				}
			}
			this.userAsyncMethod = asyncMethod ;
		}
	}
	if(!contenttype){
		contenttype = "application/x-www-form-urlencoded";
	}
	if(!query){
		query = null ;
	}
	try{
		request.open(method,service, async);
	}catch(exx1){
		var exception = new WTSException("req.open method failed","sendRequest","AJAX002",exx1);
		throw exception;
	}
	request.setRequestHeader("Content-Type", contenttype);

	try{
		request.send(query);
	}catch(exx2){
		var exception = new WTSException("req.send method failed","sendRequest","AJAX003",exx2);
		throw exception;
	}
	
	// if(asyncMethod){
	// 	return;
	// }
	//
	var result = null ;
	if(responsetype=='text'){
		result = request.responseText ;	
	}else if(responsetype=='xml'){
		result = request.responseXML ;
	}
	//document.body.style.cursor='default' ;
	//this.req = null ;
    //callback (result);
	 return result;
	
}
AJAXController.prototype.ajaxAsyncMethod=function(){
	if(this.readyState==4){
		if(this.reference.responsetype=='text'){
			this.reference.userAsyncMethod(this.responseText);
		}else{
			this.reference.userAsyncMethod(this.responseXML);
		}
	}
}

AJAXController.prototype.doRequest=function(responsetype , service , paramArr , method , async , contenttype,asyncMethod){
	try{
		var queryString = null ;
		if(paramArr){
			queryString ='';
			for(var index=0; index<paramArr.length; index++) {
				var param=paramArr[index];
				queryString+=param.getKey()+"="+param.getValue();
				if((index+1)<paramArr.length){
					queryString+="&";
				}
			}
		}	
		return this.sendRequest(responsetype , service , queryString , method , async , contenttype,asyncMethod) ;	
	}catch(exx3){
		var exception = new WTSException("doRequest Method","doRequest","AJAX001",exx3);
		throw exception;		
	}
}

AJAXController.prototype.doClientRequestAsXMLDOM=function(operation,requestURL,httpMethod,datatype){
    this.req = new ClientRequest();
    var xob = new XMLObjectBuilder();
    
    if(operation!=null  && requestURL!=null){
    	if(operation.type=='Select'){ 
    		this.req.setSelect(operation);
    	}else if(operation.type=='Insert'){ 
			this.req.setInsert(operation);   			
    	}else if(operation.type=='Update'){ 
			this.req.setUpdate(operation);   			
    	}else if(operation.type=='Delete'){ 
			this.req.setDelete(operation);   			
    	}else{
    		alert("Invalid Operation Type");
    		return;
    	}    	
    }else{
    	alert("Missing Required Paramater");
    	return;
    }
    this.req.setDataType(datatype);
    var dataToSend = xob.objectToXml(this.req);
    var query = "xmlData="+escape(dataToSend);    
    try{
    	var resp = this.sendRequest("xml",requestURL,query,httpMethod);
	    return resp;	
	}catch(ex){
		var exception = new WTSException("doClientRequestAsXMLDOM method faild.","doClientRequestAsXMLDOM","AJAX004",ex);
		throw exception;
	}
}
AJAXController.prototype.doClientRequest=function(operation,datatype,requestURL){	
	var xob = new XMLObjectBuilder();
	try{
	   	var resp = this.doClientRequestAsXMLDOM(operation,requestURL,"POST",datatype);
	    var vo =null;
	    if(resp.xml.length>0){
	    	vo = xob.xmlToObject(resp.xml);
	    }else{
	    	vo = new WTSException();
	    	vo.setMessage('No Data Found')
	    }    
	    return vo;	
	}catch(ex){
		var exception = new WTSException("doClientRequest method faild.","doClientRequest","AJAX005",ex);
		throw exception;		
	}
}

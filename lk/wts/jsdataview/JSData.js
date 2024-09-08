
function JSData(jscontroller){
	this.type = "JSData" ;
	this.jscontroller = jscontroller ;
}


JSData.prototype.getDataXMLDOM=function(start,end,method){

	var ajaxController = new  AJAXController();
	var xmlDom = ajaxController.sendRequest("xml",this.jscontroller.service,this.jscontroller.querystring+escape(this.jscontroller.reqdata)+"&start="+start+"&end="+end,method);
	return xmlDom ;
}

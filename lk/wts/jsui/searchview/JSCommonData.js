
function JSCommonData(jscontroller){
	this.type = "JSCommonData" ;
	this.jscontroller = jscontroller ;
}


JSCommonData.prototype.getDataXMLDOM=function(){

	var select = new Select();
	
	var param = new Parameter();
	param.setKey(this.jscontroller.key);
	param.setValue(this.jscontroller.reqdata);
	param.setComparison(2);
	
	select.setParameter(param);
	select.setRecordRange(new RecordRange(this.jscontroller.start,eval(this.jscontroller.end-this.jscontroller.start)));
	
	var ajaxController = new  AJAXController();
	var xmlDom = ajaxController.doClientRequestAsXMLDOM(select,this.jscontroller.service,this.jscontroller.httpMethod,this.jscontroller.entityName);
	//var xmlDom = ajaxController.sendRequest("xml",this.jscontroller.service,this.jscontroller.querystring+escape(this.jscontroller.reqdata)+"&start="+start+"&end="+end);
	return xmlDom ;
}

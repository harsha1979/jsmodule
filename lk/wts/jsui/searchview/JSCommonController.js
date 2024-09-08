wts.using('lk.wts.util.HashMap;');
wts.using('lk.wts.jsui.searchview.JSCommonData;');
wts.using('lk.wts.jsui.searchview.JSCommonView;');

function JSCommonController(id,service,key,bindings,range,selectedEvent,entityName,tableHeadersColl,isViewHeader,httpMethod){
	//service :  url ; key : parent controller name ; bindings : other controllers (to,d array) ; range : once count ; selectedEvent:oncoick event
	//tableHeadersColl : view header names array ; isViewHeader : boolean value ; entityName : data type for pass
	this.type = "JSCommonController" ;
	this.httpMethod  = httpMethod || "GET" ;
	this.id = id ;
	this.service = service ;
	//this.querystring = querystring ;
	this.entityName = entityName ;
	this.reqdata = "" ;
	this.reqCondition = "" ;
	this.start = 1 ;
	
	this.range = eval(range) ;
	this.end =  this.range ;
	this.selectedEvent = selectedEvent ;
	this.tableHeadersColl = tableHeadersColl ;
	this.key = key || this.tableHeadersColl[0];
	this.bindings = bindings || new Array();
	this.isViewHeader  = isViewHeader || true ;
	
	this.dataSet = new HashSet() ;
	this.elementNameSet = new Array();

	this.dataTableStyle = 'dataTableStyle' ;
	this.dataRowStyle = 'dataRowStyle' ;
	this.dataMouseOverRowStyle = 'dataMouseOverRowStyle' ;
	
	this.dataColumnStyle = 'dataColumnStyle' ;
	
	this.controllerTableStyle = 'controllerTableStyle' ;
	
	this.controllerCellStylePrev = 'controllerCellStylePrev' ;
	this.controllerCellStyleNext = 'controllerCellStyleNext' ;
	this.controllerCellStyleClose = 'controllerCellStyleClose' ;
	
	this.controllerMouseOverRowStyle = 'controllerMouseOverRowStyle' ;
	
	this.controllerHeaderStyle = 'controllerHeaderStyle' ;
	
	this.init();
	//alert(dd.dd);
}

JSCommonController.prototype.init=function(){
	this.jsdata = new JSCommonData(this);
	this.jsview = new JSCommonView(this);
	
	var comp = document.getElementById(this.id);
	comp.onkeyup = this.drawView ;	
	//comp.onblur = this.clear;
	comp.jscontroller = this ;
}
JSCommonController.prototype.setRequestCondition=function(names,values,comparisons,criterias){

}
JSCommonController.prototype.requestXML=function(name,value,comparison){
	
}

JSCommonController.prototype.drawView=function(){
	//alert(dd.dd);
	
	
	var jscontroller = this.jscontroller ;
	var jsview = jscontroller.jsview ;
	if(jsview){
		jsview.remove();
	}
	var textNode = document.getElementById(jscontroller.id);
	jscontroller.reqdata = textNode.value ;
	
	var jsdata = jscontroller.jsdata;
	var obj = jsdata.getDataXMLDOM(jscontroller.start,jscontroller.end,this.method) ;
	//if(obj.xml!=""){
		jsview.setData(obj);
		var viewDiv = jsview.getView();
		
		viewDiv.style.left=findPosX(textNode);
		viewDiv.style.top=findPosY(textNode) + textNode.offsetHeight;
		//document.body.appendChild(viewDiv);
	//}
	//alert("dd");
	//alert(dd.dd);
	//textNode.insertAdjacentElement("afterEnd", viewDiv);
	//document.body.jscontroller = jscontroller ;
	//document.body.onclick = jscontroller.test ;
	
}


JSCommonController.prototype.prevData=function(){
	
	if(this.start>this.range){
		
		
		var xmlDomObject  = this.jsdata.getDataXMLDOM(this.start-this.range,this.end-this.range,this.method) ;
		
		if(xmlDomObject.xml!=''){
			this.jsview.remove();
			this.jsview.setData(xmlDomObject);
			
			var textNode = document.getElementById(this.id);
			
			var viewDiv = this.jsview.getView() ;
			viewDiv.style.left=findPosX(textNode);
			viewDiv.style.top=findPosY(textNode) + textNode.offsetHeight;
			//document.body.appendChild(viewDiv);
			
			this.start = this.start-this.range ;
			this.end = this.end-this.range ;
		}
		//textNode.insertAdjacentElement("afterEnd", this.jsview.getView());
	}
}

JSCommonController.prototype.nextData=function(){
	//alert("nextData");
	//alert(dd.dd);
	
	
	var xmlDomObject  = this.jsdata.getDataXMLDOM(this.start+this.range,this.end+this.range,this.method) ;
	if(xmlDomObject.xml!=''){
		this.jsview.remove();
		this.jsview.setData(xmlDomObject);
		var textNode = document.getElementById(this.id);
		
		var viewDiv = this.jsview.getView() ;
		viewDiv.style.left=findPosX(textNode);
		viewDiv.style.top=findPosY(textNode) + textNode.offsetHeight;
		//document.body.appendChild(viewDiv);
		
		this.start = this.start+this.range ;
		this.end = this.end+this.range ;
	}
	//textNode.insertAdjacentElement("afterEnd", viewDiv);
}

JSCommonController.prototype.selectData=function(dataArray){
	var selectedDataSet = new HashMap();
	var data = "" ;
	for(var index=0; index<this.elementNameSet.length; index++) {
		var name = this.elementNameSet[index];
		if(name==this.key){
			data = dataArray[index];
		}
		selectedDataSet.put(name,dataArray[index]);
	}
	
	
	var textNode = document.getElementById(this.id);
	textNode.value = data ;
	
	this.selectedEvent(selectedDataSet);
	
	this.jsview.remove();
	this.start = 1 ;
	this.end = this.range ;
}


JSCommonController.prototype.clear=function(){
	//alert(sss.ss);
	this.jscontroller.jsview.remove();
	this.jscontroller.start = 1 ;
	this.jscontroller.end = this.jscontroller.range ;
}

JSCommonController.prototype.test=function(){
	
	if(this.jscontroller){
		if(this.sourceIndex!=this.jscontroller.jsview.viewDiv.sourceIndex){
			this.jscontroller.jsview.remove();
		}
	}
	/*alert(sss.ss);
	this.jscontroller.jsview.remove();
	this.jscontroller.start = 1 ;
	this.jscontroller.end = 10 ;*/
}
JSCommonController.prototype.setDataTableStyle=function(dataTableStyle){
	this.dataTableStyle = dataTableStyle;
}
JSCommonController.prototype.setDataRowStyle=function(dataRowStyle){
	this.dataRowStyle = dataRowStyle;
}
JSCommonController.prototype.setDataMouseOverRowStyle=function(dataMouseOverRowStyle){
	this.dataMouseOverRowStyle = dataMouseOverRowStyle;
}

JSCommonController.prototype.setControllerTableStyle=function(controllerTableStyle){
	this.controllerTableStyle = controllerTableStyle;
}
JSCommonController.prototype.setControllerCellStylePrev=function(controllerCellStylePrev){
	this.controllerCellStylePrev = controllerCellStylePrev;
}
JSCommonController.prototype.setControllerCellStyleNext=function(controllerCellStyleNext){
	this.controllerCellStyleNext = controllerCellStyleNext;
}
JSCommonController.prototype.setControllerCellStyleClose=function(controllerCellStyleClose){
	this.controllerCellStyleClose = controllerCellStyleClose;
}

JSCommonController.prototype.setControllerMouseOverPrevStyle=function(controllerMouseOverPrevStyle){
	this.controllerMouseOverPrevStyle = controllerMouseOverPrevStyle;
}
JSCommonController.prototype.setControllerMouseOverNextStyle=function(controllerMouseOverNextStyle){
	this.controllerMouseOverNextStyle = controllerMouseOverNextStyle;
}
JSCommonController.prototype.setControllerMouseOverCloseStyle=function(controllerMouseOverCloseStyle){
	this.controllerMouseOverCloseStyle = controllerMouseOverCloseStyle;
}
JSCommonController.prototype.setControllerHeaderStyle=function(controllerHeaderStyle){
	this.controllerHeaderStyle = controllerHeaderStyle ;
}

function findPosX(obj){
	var curleft = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj){
	var curtop = 0;
	var parentID=obj.id.split("_")[0];
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;		
		}
		
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

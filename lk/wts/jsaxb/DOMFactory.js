function DOMFactory(domObjType){
	this.type= "DOMFactory";
	this.domObjType =  domObjType ;
	
	var xml = "<"+this.domObjType+"></"+this.domObjType+">";
	
	this.documentObject = Common.loadDOM(xml);
		
}
DOMFactory.prototype.getRootObject=function(){
	var rootObject = null ;
	if(this.documentObject!=null){
		rootObject = this.documentObject.getElementsByTagName(this.domObjType)[0];
	}
	return rootObject ;
}

DOMFactory.prototype.getElementFor=function(elementName){
	var elem = null ;
	if(this.documentObject!=null){
		elem = this.documentObject.createElement(elementName);
	}
	return elem ;
}
DOMFactory.prototype.getTextNode=function(textContent){
	var elem = null ;
	if(this.documentObject!=null){
		elem = this.documentObject.createTextNode(textContent);
	}
	return elem ;
	
}

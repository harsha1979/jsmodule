Element.prototype = new Component;
function Element(elementName,htmlContent,thisParent){
	this.type="Element";
	this.Element(elementName,htmlContent,thisParent)
	//this.thisParent = thisParent ;
}

Element.prototype.Element=function(elementName,htmlContent,thisParent){
	this.elementName = elementName;
	this.thisParent = thisParent ;
	if(this.thisParent){
		this.thisParent.addElement(this);
	}
	
  	this.htmlContent = htmlContent ;
  	if(!this.htmlContent){
  		this.htmlContent = this.getContentHTML();
  	}
  	
  	this.elementContainer = document.createElement("DIV");
  	this.elementContainer.innerHTML = htmlContent ;  	
  	
  	
  	this.nextElement = null ;
  	this.previousElement = null ;
  	
  	this.state = '....' ;
  	this.init();
}



Element.prototype.init = function(){
	this.setContent(this.elementContainer);
}
Element.prototype.eventRegister = function(tagName,id,eventName,functionReference,element){
	var tag = this.getTag(tagName,id);
	if(tag){
		tag.thisElement = element;
		tag[eventName] = functionReference ;
	}
	
}

Element.prototype.setNextElement = function(nextElement){
	if(nextElement.type=='Wizard' || nextElement.type=='Element'){
		this.nextElement = nextElement ; 
	}else{
		this.nextElement = this.thisParent.getElements(nextElement);
	}
	this.nextElement.setPreviousElement(this);
}
Element.prototype.getNextElement = function(){
	return this.nextElement ;
}
Element.prototype.setPreviousElement = function(previousElement){
	if(previousElement.type=='Wizard' || previousElement.type=='Element'){
		this.previousElement = previousElement ; 
	}else{
		this.previousElement = this.thisParent.getElements(previousElement);
	}
}
Element.prototype.getPreviousElement = function(){
	return this.previousElement ;
}
Element.prototype.setName = function(elementName){
	this.elementName = elementName ;
}
Element.prototype.getName = function(){
	return this.elementName ;
}
Element.prototype.setState = function(state){
	this.state = state ;
}
Element.prototype.getState = function(){
	return this.state ;
}

Element.prototype.setContentHTML = function(htmlContent){
	this.htmlContent = htmlContent ;
}
Element.prototype.getContentHTML = function(){
	return this.htmlContent;
}

Element.prototype.getTagValue = function(tagName,id){
	var tag = this.getTag(tagName,id);
	if(tag){
		return tag.value ;
	}else{
		return null ;
	}
}
Element.prototype.setTagValue = function(tagName,id,value){
	var tag = this.getTag(tagName,id);
	if(tag){
		tag.value=value;
	}	
}
Element.prototype.getTag = function(tagName,id){
	var tags = this.elementContainer.getElementsByTagName(tagName);
	for(var index=0; index<tags.length; index++) {
		var tag = tags[index];
		var thisID = tag.getAttribute('ID');
		if( thisID == id){
			return tag;
		}
	}
}

Element.prototype.getWizardPane = function(element){
	var parentComp = element.thisParent;
	if(parentComp.type!='WizardPane'){
		parentComp = this.getWizardPane(parentComp);
	}
	return parentComp ;
}


Element.prototype.validateOnExit = function(){
	this.state = 'Success' ;
	return true;
}

Element.prototype.validate = function(tagName){
	var tags = this.elementContainer.getElementsByTagName(tagName);
	for(var index=0; index<tags.length; index++) {
		var tag = tags[index];
		if(tag.type=='text'){
			var name = tag.getAttribute('DISPLAYNAME');
			var required = tag.getAttribute('REQUIRED');
			if(tag.value=='' &&  required && required=='true'){
				alert(name + " is Required Field.");
				//tag.focus();
				return false;
			}
			var datatype = tag.getAttribute('DATATYPE');
			if(datatype){
				if(datatype=='string' && tag.value=='' ){
					 alert(name + " value wrong data type.");
					 //tag.focus();
					 return false;
				}else if(datatype=='integer' && tag.value=='' && isNaN(tag.value)){
					 alert(name + " value wrong data type.");
					 //tag.focus();
					 return false;
				}
			}
		}
	}
	return true;
}
Element.prototype.onFinish = function(){
	
}

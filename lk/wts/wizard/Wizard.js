
wts.using("lk.wts.util.HashMap.js");

function Wizard(wizardName,parentWizard,wizardType){
	this.type = 'Wizard' ;
	this.Wizard(wizardName,parentWizard,wizardType);
}

Wizard.prototype.Wizard=function(wizardName,parentWizard,wizardType){
	this.wizardType="BASE"; 
	if(wizardType){
		this.wizardType=wizardType; 
	}
	
	
	//this.thisParent = null ;
	
	this.thisParent = parentWizard ;
	if(this.thisParent){
		this.thisParent.addElement(this);
	}
	
	this.wizardName = wizardName ;
	this.parentWizard = parentWizard ;
	
	this.currentElement = null ;
	this.firstElement = null ;
	this.elements = new HashMap();
	
	this.nextElement = null ;
  	this.previousElement = null ;
  	  	
  	this.state = "..." ;
}

Wizard.prototype.getName=function(){
	return this.wizardName ;
}
Wizard.prototype.setName=function(wizardName){
	this.wizardName = wizardName;
}

Wizard.prototype.getParentWizard=function(){
	return this.parentWizard ;
}
Wizard.prototype.setParentWizard=function(parentWizard){
	this.parentWizard = parentWizard;
}

Wizard.prototype.getElements=function(){
	return this.elements ;
}
Wizard.prototype.setElements=function(elements){
	this.elements = elements;
}


Wizard.prototype.setNextElement = function(nextElement){
	if(nextElement.type=='Wizard' || nextElement.type=='Element'){
		this.nextElement = nextElement ; 
	}else{
		this.nextElement = this.getElements(nextElement);
	}
	this.nextElement.setPreviousElement(this);
}
Wizard.prototype.getNextElement = function(){
	return this.nextElement ;
}

Wizard.prototype.setPreviousElement = function(previousElement){
	if(previousElement.type=='Wizard' || previousElement.type=='Element'){
		this.previousElement = previousElement ; 
	}else{
		this.previousElement = this.getElements(previousElement);
	} 
}
Wizard.prototype.getPreviousElement = function(){
	return this.previousElement ;
}

Wizard.prototype.validateOnExit = function(){
	this.state = 'Success' ;
}

Wizard.prototype.onFinish = function(){
	
}

Wizard.prototype.setState = function(state){
	this.state = state ;
}
Wizard.prototype.getState = function(){
	return this.state ;
}

//***
Wizard.prototype.addElement=function(element,isFirst){
	element.thisParent = this ;
	var name = element.getName() ;
	if(isFirst || this.elements.size()==0){
		this.firstElement = element ;
	}
	this.elements.put(name,element);
}

Wizard.prototype.getElement=function(name){
	return this.elements.get(name);
}

Wizard.prototype.removeElement=function(name){
	this.elements.remove(name);
}
Wizard.prototype.getCurrentElement=function(){
	return this.currentElement;
}



/*
WizardElement.prototype.addEvent=function(wizardName, eventName ,eventFunction ){
	var editorWizardElement = this.elements.get(wizardName);
	if(editorWizardElement){
		var editorEventSet = editorWizardElement.getEventSet();
		editorEventSet = new HashMap();
		var events = new HashSet();
		events.add(eventFunction);
		editorEventSet.put(eventName,events);
	}
}

WizardElement.prototype.appendEvent=function(wizardName ,eventName ,eventFunction ){
	var editorWizardElement = this.elements.get(wizardName);
	if(editorWizardElement){
		
	}
}
* */
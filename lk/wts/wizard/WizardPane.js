wts.using("lk.wts.jsui.floatingpane.*;")
function WizardPane(wizard , width,height,themeName,wizardLayout){	
	
	this.type="WizardPane";	
		
	this.thisParent = null ;
	//this.wizardHolderID = wizardHolderID ;
	this.iFrameDivID="WizardiFrameDivID";
	this.status="Open";
	this.parentWizard = wizard ;
	this.wizardWidth = width ;
	this.wizardHeight = height ;
	
	//this.wizardHolder = document.getElementById(this.wizardHolderID);
	
	//this.wizardContainer = document.createElement('DIV');
	this.floatingPaneFactory=FloatingPaneFactory;
	this.floatingPane=this.floatingPaneFactory.createPane('id_'+wizard.getName()+'_wizard');
	//this.floatingPane.setContent(this.wizardContainer);
	this.floatingPane.setTitle(wizard.getName());
	
	if(this.themeName){
		this.themeName=themeName;
	}else{
		this.themeName="";
	}
	
	//add  wizardContainer Color;
	
	//this.wizardContainer.style.backgroundImage="url(http://asanka:8080/talaccounts/images/header.gif)";

	
	//this.floatingPane.container.id = 'id_'+this.wizardName+'_wizard';
	//this.wizardContainer.id = 'id_'+this.wizardName+'_wizard';
	
	//this.wizardContainer.style.position = 'absolute';
	this.wizardLeft=(document.body.clientWidth-width)/2;
	
	//alert(screen.width+","+document.body.clientWidth);
	this.wizardTop=(document.body.clientHeight-height)/2;
	
	this.floatingPane.setWidth(width);
	this.floatingPane.setHeight(height);
	
	this.floatingPane.setPagePositionX(this.wizardLeft);
	this.floatingPane.setPagePositionY(this.wizardTop);
	
	
	
	//this.wizardContainer.style.left = this.wizardLeft;//findPosX(this.wizardHolder);
	//this.wizardContainer.style.top = this.wizardTop;//findPosY(this.wizardHolder);

	//this.wizardLayout = wizardLayout;
	this.wizard = wizard ;
	
	this.wizard.thisParent = this ;
	
	this.elements = null ;

	this.cursor = 0 ;	
	this.init();
	this.applyTheme()
	this.wizardLayout.buttonPanel.getButton(this.wizardLayout.buttonPanel.previousButtonID).setEnabled(false);	
	
	
}
WizardPane.prototype.applyTheme=function(){
	
	//this.wizardContainer.className=this.themeName+"container";
	var flowPanelTD = document.getElementById(this.wizardLayout.flowPanelId);
	flowPanelTD.className=this.themeName+"flowPanel";
	var buttonPanelTD = document.getElementById(this.wizardLayout.buttonPanelId);
	buttonPanelTD.className=this.themeName+"buttonPanel";
	var wizardElementPanelTD = document.getElementById(this.wizardLayout.wizardElementPanelId);
	wizardElementPanelTD.className=this.themeName+"wizardElementPanel";
	
}

WizardPane.prototype.init=function(){
	if(!this.wizardLayout){
		this.wizardLayout = new DefaultWizardLayout('id_'+this.wizard.getName()+'_wizard' ,this.wizardWidth,this.wizardHeight,null,null,null);
	}
	this.setInitialElement(this.wizard);
	this.wizardLayout.getWizardElementsPanel().addWizardElement(this.wizard.currentElement);
	this.wizard.currentElement.setState('current');
	this.drawWizard();
	//this.nextButton(this);
	this.drawFlow(this.parentWizard);
	//this.updateFlow(this.cursor);
	this.defaultEventRegister();
}

WizardPane.prototype.setCurrentWizard=function(wizard){
	this.wizard = wizard ;
}
WizardPane.prototype.getCurrentWizard=function(){
	return this.wizard  ;
}

WizardPane.prototype.setInitialElement=function(wizard){
	if(wizard){
		if(!wizard.currentElement){
		 	wizard.currentElement = wizard.firstElement;
		}
		if(wizard.currentElement && wizard.currentElement.type=='Wizard'){
			this.setInitialElement(wizard.currentElement);
		}else{
			this.setCurrentWizard(wizard) ;
		}		
	}
}

WizardPane.prototype.defaultEventRegister=function(){
	var buttonPanel = this.wizardLayout.getButtonPanel();
	buttonPanel.attachEventPreviousButton("onclick",this.previousButtonEvent,this);
	buttonPanel.attachEventNextButton("onclick",this.nextButtonEvent,this);
	buttonPanel.attachEventCancelButton("onclick",this.cancelButton,this);
	buttonPanel.attachEventFinishButton("onclick",this.finishButton,this);
}

WizardPane.prototype.nextButtonEvent=function(){
	
	if(this.current.wizard.currentElement){
		var nextElement=this.current.wizard.currentElement.getNextElement();
		if(nextElement){
			if(!this.current.wizard.currentElement.validateOnExit()){
				return false;
			}
		}
	}
	this.current.nextButton(this.current);
}
WizardPane.prototype.previousButtonEvent=function(){
	if(this.current.wizard.currentElement){
		this.current.wizard.currentElement.setState('');
	}
	this.current.previousButton(this.current);
}

WizardPane.prototype.nextButton=function(current){
		
		var element = null ;
		
		if(!current.wizard.currentElement){
			element = current.wizard.firstElement;
			
		}else {
			element = current.wizard.currentElement.getNextElement();
		}
		
		if(element){
			
			
			current.wizard.currentElement = element ;
			if(current.wizard.currentElement.type=='Wizard'){
				current.setCurrentWizard(current.wizard.currentElement) ;
				current.nextButton(current);
			}else{
				
				var nextElement=element.getNextElement();
				if(nextElement){
					element.setState('current');
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(true);
				}else{				
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(false);
				}
			}
			current.drawElement(current,current.wizard.currentElement);
			
		}else if(current.wizard.wizardType=='POPUP'){
				current.setCurrentWizard(current.wizard.getParentWizard()) ;
				current.drawElement(current,current.wizard.currentElement);
		}else if(current.wizard.getParentWizard() && !current.isLastElement(current,current.wizard)){
				current.setCurrentWizard(current.wizard.getParentWizard()) ;
				current.nextButton(current);
		}
		
		
		/*if(element){// There is a Next Element
			alert("1");
			current.wizard.currentElement = element ;
			if(current.wizard.currentElement.type=='Wizard'){// next element is a wizard
				alert("2");
				current.setCurrentWizard(current.wizard.currentElement) ;
				current.nextButton(current);
			}else{// next element is not a wizard
				alert("3");
				element.setState('current');
				alert(current.wizardLayout.buttonPanel.nextButtonID);
				if(!element.getNextElement()){
					alert("3-1");
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(false);
				}else{
					
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(true);
				}
			}
			current.drawElement(current,current.wizard.currentElement);
		}else if(current.wizard.wizardType=='POPUP'){//
				alert("4");
				current.setCurrentWizard(current.wizard.getParentWizard()) ;
				current.drawElement(current,current.wizard.currentElement);
		}else if(current.wizard.getParentWizard() && !current.isLastElement(current,current.wizard)){
			alert("5");
				current.setCurrentWizard(current.wizard.getParentWizard()) ;
				current.nextButton(current);
		}else{// this is the last element of the wizard
			alert("6");
			current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(false);
		}*/
		current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.previousButtonID).setEnabled(true);
		
		this.drawFlow(this.parentWizard);
	
}
WizardPane.prototype.previousButton=function(current){
		var element = null ;
		if(!current.wizard.currentElement){
			return ;
		}else{
			element = current.wizard.currentElement.getPreviousElement();
		}
		if(element){
			current.wizard.currentElement = element ;
			current.wizard.currentElement.setState('Current');
			if(current.wizard.currentElement.type=='Wizard'){
				current.wizard = current.wizard.currentElement ;
			}else{
				var prevElement=element.getPreviousElement();
				if(prevElement){
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.previousButtonID).setEnabled(true);
				}else{				
					current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.previousButtonID).setEnabled(false);
				}
			}
			current.drawElement(current,current.wizard.currentElement);
		}else if(element==null && current.wizard.wizardType=='POPUP'){
				current.setCurrentWizard(current.wizard.getParentWizard()) ;
				current.drawElement(current,current.wizard.currentElement);
		}else if(current.wizard.getParentWizard() && !current.isFirstElement(current,current.wizard)){
				current.wizard.currentElement = null ;
				current.wizard = current.wizard.getParentWizard() ;
				current.previousButton(current);
		}
		current.wizardLayout.buttonPanel.getButton(current.wizardLayout.buttonPanel.nextButtonID).setEnabled(true);
		this.drawFlow(this.parentWizard);
	
}

WizardPane.prototype.isLastElement=function(current,wizard){
	var p = wizard.getParentWizard();
	if(!p){
		return true ;
	}
	if(p.currentElement){
		if(p.currentElement.getNextElement()){
			return false ;
		}else{
			return current.isLastElement(current,p);
		}
	}
	return false ;
}

WizardPane.prototype.isFirstElement=function(current,wizard){
	var p = wizard.getParentWizard();
	if(!p){
		return true ;
	}
	if(p.currentElement){
		if(p.currentElement.getPreviousElement()){
			return false ;
		}else{
			
			return current.isFirstElement(current,p);
		}
	}
	return false ;
}


WizardPane.prototype.drawElement=function(current,element){
	var wizardElementsPanel = current.wizardLayout.getWizardElementsPanel();
	wizardElementsPanel.addWizardElement(element);
}


WizardPane.prototype.cancelButton=function(){
	this.current.disposeWizard();
	
}
WizardPane.prototype.finishButton=function(){
	if(this.current.getCurrentWizard().onFinish()){
		this.current.disposeWizard();
	}	
}

WizardPane.prototype.drawWizard=function(){
	//this.wizardHolder.appendChild(this.wizardContainer);
	document.body.appendChild(this.floatingPane.getFloatingPane());
	this.floatingPane.setContent(this.wizardLayout.getContent());
	this.floatingPane.adjustiFrame();
	
	var f=this.floatingPane.getFloatingPane();
	for(var i=0;i<f.all.length;i++){
		if(f.all[i].tagName!="INPUT" && f.all[i].tagName!="TEXTAREA"){
			f.all[i].unselectable="on";	
		}
	}
	FloatingPaneFactory.orgernizeFloatingPanes();
	
	//this.wizardContainer.appendChild(this.wizardLayout.getContent());	
}
WizardPane.prototype.disposeWizard=function(){
	this.floatingPane.exit();
	this.status="Finished";
	//this.wizardHolder.removeChild(this.wizardHolder.childNodes[0]);
}

WizardPane.prototype.drawFlow=function(){
	var flowPanel = this.wizardLayout.getFlowPanel();
 	flowPanel.drawFlow(this.parentWizard);
}

WizardPane.prototype.updateFlow=function(index){
	
 	/*var flowPanel = this.wizardLayout.getFlowPanel();
 	flowPanel.drawFlow(this.wizardElements.getOrder(),index);*/
}

WizardPane.prototype.visible=function(isVisible){
	/*for(var index=0; index<this.wizardHolder.childNodes.length; index++) {
		var aNode = this.wizardHolder.childNodes[index];
		var idAttribute = aNode.getAttribute('id');
		if(idAttribute==this.wizardContainer.id){
			aNode.style.visibility=isVisible;
		}
	}*/
}
WizardPane.prototype.getParentWizard=function(){
	return this.parentWizard ;
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


DefaultWizardElementsPanel.prototype = new Component();
function DefaultWizardElementsPanel(){
	this.type ='DefaultWizardElementPanel';
	
	this.wizardElementsPanelHolderID = 'id_elementholder';
	this.panelContainer = document.createElement('DIV');
	this.panelContainer.id = this.wizardElementPanelHolderID ;
	this.init();
}

DefaultWizardElementsPanel.prototype.init=function(){
	this.setContent(this.panelContainer);
}
DefaultWizardElementsPanel.prototype.addWizardElement=function(wizardElement){
	if(wizardElement){
		this.clear();
		this.panelContainer.appendChild(wizardElement.getContent());
	}
}
DefaultWizardElementsPanel.prototype.clear=function(){
	if(this.panelContainer && this.panelContainer.firstChild!=null){
		this.panelContainer.removeChild(this.panelContainer.firstChild);
	}
}

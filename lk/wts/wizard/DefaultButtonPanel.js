DefaultButtonPanel.prototype = new Component();
function DefaultButtonPanel(id,customButtons,customOrder){
	this.type= "DefaultButtonPanel";
	this.panelTable = null ;
	
	this.previousButtonID = id+"id_previousbutton";
	this.nextButtonID = id+"id_nextbutton";
	this.canelButtonID = id+"id_cancelbutton";
	this.finishButtonID = id+"id_finishbutton";
	
	this.buttons = this.getDefaultButtons() ;
	this.buttonOrder = this.getDefaultButtonOrder()  ;
	if(customButtons){
		this.buttons.putAll(editorDefaultButtons);
	}	
	if(customOrder){
		this.buttonOrder = customOrder;
	}	
	this.init();
	
}
DefaultButtonPanel.prototype.init= function(){
	
	/*var editorDefaultButtons = this.getDefaultButtons();
	var editorButtons = this.getButtons();	
	editorButtons.putAll(editorDefaultButtons);
	this.buttons= editorButtons ;
	
	this.buttonOrder = this.getDefaultButtonOrder();
	if(this.getButtonOrder().size()>0){
		this.buttonOrder = this.getButtonOrder();
	}*/
	
	var editorTable = document.createElement("<table align='right' border='0'  cellpadding='2' cellspacing='2' >");
	var editorRaw = editorTable.insertRow(-1);
	
 	var iterator = this.buttonOrder.iterator(); 
 	while (iterator.hasNext()) {
		var obj = iterator.next();
		var editorCell = editorRaw.insertCell(-1);
		var aButton = this.buttons.get(obj);
		editorCell.insertBefore(aButton.getContent(),null);
	}
	this.panelTable = editorTable ;
	
	this.setContent(this.panelTable);
}

DefaultButtonPanel.prototype.getDefaultButtons= function(){
	
	var editorButtons = new HashMap();
	
	var editorDefaultButtons = new DefaultButton(this.previousButtonID,"Previous","Previous","button",'');
	editorButtons.put(this.previousButtonID,editorDefaultButtons);
	editorDefaultButtons = new DefaultButton(this.nextButtonID,"Next","Next","button",'');
	editorButtons.put(this.nextButtonID,editorDefaultButtons);
	editorDefaultButtons = new DefaultButton(this.canelButtonID,"Cancel","Cancel","button",'');
	editorButtons.put(this.canelButtonID,editorDefaultButtons);
	editorDefaultButtons = new DefaultButton(this.finishButtonID,"Finish","Finish","button",'');
	editorButtons.put(this.finishButtonID,editorDefaultButtons);
	
	return editorButtons ;
	
}




/*DefaultButtonPanel.prototype.getButtons = function(){
	var editorButtons = new HashMap();
	return editorButtons ;
}*/

DefaultButtonPanel.prototype.getDefaultButtonOrder = function(){
	
	var editorButtonOrder = new ArrayList();
	
	editorButtonOrder.add(this.previousButtonID);
	editorButtonOrder.add(this.nextButtonID);
	editorButtonOrder.add(this.canelButtonID);
	editorButtonOrder.add(this.finishButtonID);
	
	return editorButtonOrder ;
}

DefaultButtonPanel.prototype.setDefaultButtonOrder = function(order){
	if(order){
		this.buttonOrder = order ;
	}
}

/*DefaultButtonPanel.prototype.getButtonOrder = function(){
	var editorButtonOrder = new ArrayList();
	return editorButtonOrder ;
}*/


DefaultButtonPanel.prototype.add = function(aButton,position){
	if(!this.buttons){
		this.buttons = new HashMap();
	}
	this.buttons.put(aButton.getID(),aButton);
	if(position && position>=this.buttonOrder.size()){
		this.buttonOrder.addForIndex(position,aButton.getID());
	}else{
		this.buttonOrder.add(aButton.getID());
	}
}
DefaultButtonPanel.prototype.remove = function(aButton){
	if(aButton && this.buttons){
		this.buttons.remove(aButton.getID());
		var iterator = this.buttonOrder.iterator();
		while (iterator.hasNext()) {
			var obj = iterator.next();
			if(obj==aButton.getID()){
				iterator.remove();
			}
		}
	}
}

DefaultButtonPanel.prototype.getButton= function(buttonID){
	return this.buttons.get(buttonID);
}
DefaultButtonPanel.prototype.attachEventForButton= function(buttonID , eventName , eventFunction,container){
	var aButton = this.getButton(buttonID);
	aButton.getContent().current= container ;
	aButton.getContent()[eventName] = eventFunction ;
}


DefaultButtonPanel.prototype.attachEventPreviousButton= function(eventName , eventFunction , current){
	this.attachEventForButton(this.previousButtonID , eventName , eventFunction ,current);
}
DefaultButtonPanel.prototype.attachEventNextButton= function(eventName , eventFunction , current){
	this.attachEventForButton(this.nextButtonID , eventName , eventFunction ,current);
}
DefaultButtonPanel.prototype.attachEventCancelButton= function(eventName , eventFunction, current){
	this.attachEventForButton(this.canelButtonID , eventName , eventFunction ,current);
}
DefaultButtonPanel.prototype.attachEventFinishButton= function(eventName , eventFunction, current){
	this.attachEventForButton(this.finishButtonID , eventName , eventFunction ,current);
}




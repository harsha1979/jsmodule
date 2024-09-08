function JSOptionPaneReturn(){

	this.inputMessage=null;
	this.setInputMessage=setInputMessage;
	this.getInputMessage=getInputMessage;

	this.button=null;
	this.setButton=setButton;
	this.getButton=getButton;	

	function setInputMessage(pInputMessage){
		this.inputMessage=pInputMessage;
	}
	function getInputMessage(){
		return this.inputMessage;
	}
	
	function setButton(pButton){
		this.button=pButton;
	}
	function getButton(){
		return this.button;
	}
	
}




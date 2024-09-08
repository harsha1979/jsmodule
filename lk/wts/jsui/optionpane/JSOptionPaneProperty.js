function JSOptionPaneProperty(){


	this.type='JSOptionPaneProperty';
	
	
	
	
	this.optionPaneType=null;
	this.setOptionPaneType=setOptionPaneType;
	this.getOptionPaneType=getOptionPaneType;
	
	

	this.TYPE_ERROR_MESSAGE=0;
	this.TYPE_INFORMATION_MESSAGE=1;
	this.TYPE_WARNING_MESSAGE=2;
	this.TYPE_QUESTION_MESSAGE=3;
	this.TYPE_PLAIN_MESSAGE=4;
	
	this.OPTION_DEFAULT=0;
	this.OPTION_YES_NO=1;
	this.OPTION_YES_NO_CANCEL=2;
	this.OPTION_OK_CANCEL=3;
	
	
	this.TYPE_CONFIRMDIALOG=0;
	this.TYPE_INPUTMDIALOG=1;
	this.TYPE_MESSAGEDIALOG=2;
	this.TYPE_OPTIONDIALOG=3;
	
	
	

	this.message=null;
	this.setMessage=setMessage;
	this.getMessage=getMessage;
		
	this.icon=null;
	this.setIcon=setIcon;
	this.getIcon=getIcon;
	
	this.type=null;
	this.setType=setType;
	this.getType=getType;

	this.option=null;
	this.setOption=setOption;
	this.getOption=getOption;	
	
	
	

	function setMessage(pMessage){
		this.message=pMessage;
	}
	function getMessage(){
		return this.message;
	}
	
	
	function setIcon(pIcon){
		this.icon=pIcon;
	}
	function getIcon(){
		return this.icon;
	}
	
	
	function setType(pType){
		this.type=pType;
	}
	function getType(){
		return this.type;
	}
	
	
	
	function setOption(pOption){
		this.option=pOption;
	}
	function getOption(){
		return this.option;
	}
	
	function setOptionPaneType(pOptionPaneType){
		this.optionPaneType=pOptionPaneType;
	}
	function getOptionPaneType(){
		return this.optionPaneType;
	}
	

}

//alert(serverPath);
//document.write("<script src='"+serverPath+"lk/wts/jsoptionpane/JSOptionPaneProperty.js' language='javascript' type='text/javascript'></script>");
//document.write("<script src='"+serverPath+"lk/wts/jsoptionpane/JSOptionPaneReturn.js' language='javascript' type='text/javascript'></script>");
wts.using('lk.wts.jsui.jsoptionpane.JSOptionPaneProperty;');
wts.using('lk.wts.jsui.jsoptionpane.JSOptionPaneReturn;');

function JSOptionPane() {


}




JSOptionPane.prototype.showConfirmDialog=function(message, messageType, optionType, icon,serverPath2){

	this.jsOptionPaneProperty = new JSOptionPaneProperty();
	this.jsOptionPaneReturn = new JSOptionPaneReturn();
	

	if(message != 'null'){
	
		this.jsOptionPaneProperty.setMessage(message);

	}else{

		this.jsOptionPaneProperty.setMessage('JavaScript message');
	}
	
	if(messageType!='null'){
		this.jsOptionPaneProperty.setType(messageType);
		
	}else{
		
		this.jsOptionPaneProperty.setType(this.jsOptionPaneProperty.TYPE_PLAIN_MESSAGE);
	}
	
	if(optionType!='null'){

		this.jsOptionPaneProperty.setOption(optionType);
	}else{
		
		this.jsOptionPaneProperty.setOption(this.jsOptionPaneProperty.OPTION_DEFAULT);
	}
	
	if(icon!='null'){
		this.jsOptionPaneProperty.setIcon(icon);
		
	}else{

		this.jsOptionPaneProperty.setIcon('null');
	}
	
	
	this.jsOptionPaneProperty.setOptionPaneType(this.jsOptionPaneProperty.TYPE_CONFIRMDIALOG);
	
	
	var obj=new Object();
	
	obj.property=this.jsOptionPaneProperty;
	obj.returnValue=this.jsOptionPaneReturn;
	
	
	var returnVal = window.showModalDialog(serverPath2+"JSOptionWindow.html",obj,"dialogHeight:10;dialogWidth:200;center:yes;status:yes;scroll:no;unadorned:yes");
	
	if(returnVal){
		return this.jsOptionPaneReturn.getButton();
	}else{
		return null; 
	}
	
}



JSOptionPane.prototype.showMessageDialog=function(message, messageType,  icon){

	this.jsOptionPaneProperty = new JSOptionPaneProperty();
	this.jsOptionPaneReturn = new JSOptionPaneReturn();
	

	if(message != 'null'){
	
		this.jsOptionPaneProperty.setMessage(message);

	}else{

		this.jsOptionPaneProperty.setMessage('JavaScript message');
	}
	
	if(messageType!='null'){
		this.jsOptionPaneProperty.setType(messageType);
		
	}else{
		
		this.jsOptionPaneProperty.setType(this.jsOptionPaneProperty.TYPE_PLAIN_MESSAGE);
	}
	
		
	if(icon!='null'){
		this.jsOptionPaneProperty.setIcon(icon);
		
	}else{

		this.jsOptionPaneProperty.setIcon('null');
	}
	
	
	this.jsOptionPaneProperty.setOptionPaneType(this.jsOptionPaneProperty.TYPE_MESSAGEDIALOG);
	
	
	var obj=new Object();
	
	obj.property=this.jsOptionPaneProperty;
	obj.returnValue=this.jsOptionPaneReturn;
	
	
	var returnVal = window.showModalDialog("JSOptionWindow.html",obj,"dialogHeight:125px;dialogWidth:350px;center:yes;status:no;scroll:no;unadorned:yes");
	
	
}





JSOptionPane.prototype.showInputDialog=function(message, messageType,  icon){

	this.jsOptionPaneProperty = new JSOptionPaneProperty();
	this.jsOptionPaneReturn = new JSOptionPaneReturn();
	

	if(message != 'null'){
	
		this.jsOptionPaneProperty.setMessage(message);

	}else{

		this.jsOptionPaneProperty.setMessage('JavaScript message');
	}
	
	if(messageType!='null'){
		this.jsOptionPaneProperty.setType(messageType);
		
	}else{
		
		this.jsOptionPaneProperty.setType(this.jsOptionPaneProperty.TYPE_PLAIN_MESSAGE);
	}
	
		
	if(icon!='null'){
		this.jsOptionPaneProperty.setIcon(icon);
		
	}else{

		this.jsOptionPaneProperty.setIcon('null');
	}
	
	
	this.jsOptionPaneProperty.setOptionPaneType(this.jsOptionPaneProperty.TYPE_INPUTMDIALOG);
	
	
	var obj=new Object();
	
	obj.property=this.jsOptionPaneProperty;
	obj.returnValue=this.jsOptionPaneReturn;
	
	
	var returnVal = window.showModalDialog("JSOptionWindow.html",obj,"dialogHeight:9;dialogWidth:20;center:yes;status:no;scroll:no;unadorned:yes");
	
	if(returnVal){
		return this.jsOptionPaneReturn.getInputMessage();
	}else{
		return null; 
	}
	
}











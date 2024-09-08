DefaultButton.prototype = new Component();
function DefaultButton(id,name,value,buttonType,src){

	this.type = 'DefaultButton' ;
	this.button = null ;
	
	this.init();
	
	this.setID(id);
	this.setName(name);
	this.setValue(value);
	this.setButtonType(buttonType);
	if(src){
		this.setSrc(src);
	}
	
}

DefaultButton.prototype.init=function(){
	this.buttonBase= document.createElement("<table border='0'  cellpadding='0' cellspacing='0' class='buttonPanelButtonTable'>");
	this.buttonTD=this.buttonBase.insertRow().insertCell();
	this.buttonTD.unselectable="on";
	this.buttonTD.width="70px";
	//this.buttonTD.height="25px";
	this.buttonTD.align="center";
	this.buttonTD.className="buttonPanelButton"
	this.buttonTD.background=baseURL+'images/wizard/LineGray.jpg';
	//this.button = document.createElement("input");
	// 	
	
	//this.button=document.createElement("button");
	
	this.setContent(this.buttonBase);
}

DefaultButton.prototype.setID=function(id){
	this.buttonTD.id = id ;
}
DefaultButton.prototype.getID=function(){
	return this.buttonTD.id;
}

DefaultButton.prototype.setName=function(name){
	this.buttonTD.name = name || "unknown" ;
}
DefaultButton.prototype.getName=function(){
	return this.buttonTD.name;
}

DefaultButton.prototype.setValue=function(value){
	this.buttonTD.innerText = value  || "unknown" ;
}
DefaultButton.prototype.getValue=function(){
	return this.buttonTD.innerText;
}

DefaultButton.prototype.setButtonType=function(buttonType){
	this.buttonTD.type = buttonType ;
}
DefaultButton.prototype.getButtonType=function(){
	return this.buttonTD.type;
}

DefaultButton.prototype.setSrc=function(src){
	if(src){
		this.buttonTD.src = src  ;
	}
}
DefaultButton.prototype.getSrc=function(){
	return this.buttonTD.src;
}
DefaultButton.prototype.setEnabled=function(enabled){
	if(enabled){
		
		if(this.buttonTD.bgImg){
			this.buttonTD.background=this.buttonTD.bgImg;
		}
		this.buttonTD.className="buttonPanelButton";
		
	}else{
		
		this.buttonTD.bgImg=this.buttonTD.background;
		//this.buttonTD.background="none";
		this.buttonTD.className="buttonPanelButtonDisabled";
		
	}	
}



DefaultWizardLayout.prototype = new Component();
function DefaultWizardLayout(id,width,height,buttonPanel,flowPanel,wizardElementsPanel){
	
	this.type=  "DefaultWizardLayout" ; 
	this.id="";
	if(id){
		this.id=id;
	}
	this.flowPanelId = this.id+"id_flowpanel" ;
	this.buttonPanelId = this.id+"id_buttonpanel" ;
	this.wizardElementPanelId = this.id+"id_elementspanel" ;
	this.width=width;
	this.height=height;
	this.layoutContainer = document.createElement("div");
	
	this.buttonPanel =  buttonPanel ;
	this.flowPanel = flowPanel ;
	this.wizardElementsPanel = wizardElementsPanel ;

	this.init();
}

DefaultWizardLayout.prototype.init=function(){
	
	this.htmlContent ='<TABLE style="border-left:ridge #D5D0C8 1px;border-right:ridge #D5D0C8 2px;border-bottom:ridge #D5D0C8 2px;border-top:ridge #D5D0C8 1px" WIDTH="'+this.width+'px" HEIGHT="'+this.height+'px" valign="top" cellpadding="0" cellspacing="0">';
	//this.htmlContent +='	<TR HEIGHT="25px" >';
	//this.htmlContent +='		<TD COLSPAN="2" background="'+baseURL+'images/wizard/title_back.gif" ></TD>';
	//this.htmlContent +='	</TR>';
	this.htmlContent +='	<TR HEIGHT="100%">';
	this.htmlContent +='		<TD WIDTH="150px" valign="top" >';//style="border-right:ridge #D5D0C8 1px;"
	this.htmlContent +='			<TABLE HEIGHT="100%" WIDTH="150px"   valign="top" cellpadding="0" cellspacing="0">';
	this.htmlContent +='				<TR>';
	this.htmlContent +='					<TD background="'+baseURL+'images/wizard/1.jpg" id="'+this.flowPanelId+'" valign="top" WIDTH="100%"></TD>';
	this.htmlContent +='				</TR>';
	this.htmlContent +='			</TABLE>';
	this.htmlContent +='		</TD>';	
	this.htmlContent +='		<TD WIDTH="100%"  valign="top">';
	this.htmlContent +='			<TABLE BORDER="0" HEIGHT="100%" WIDTH="100%" cellpadding="0" cellspacing="0" valign="top">';
	this.htmlContent +='				<TR HEIGHT="85%">';
	this.htmlContent +='					<TD  id="'+this.wizardElementPanelId+'" valign="top"></TD>';
	this.htmlContent +='				</TR>';
	this.htmlContent +='				<TR HEIGHT="15%">';
	this.htmlContent +='					<TD style="border-top:ridge" align="right" id="'+this.buttonPanelId+'"></TD>';
	this.htmlContent +='				</TR>';
	this.htmlContent +='			</TABLE>';
	this.htmlContent +='		</TD>';
	this.htmlContent +='	</TR>';
	this.htmlContent +='</TABLE>';
	
	
	this.layoutContainer.innerHTML = this.htmlContent ;
	
	if(!this.buttonPanel){
		this.setButtonPanel(new DefaultButtonPanel(this.id,null,null))
	}
	if(!this.flowPanel){
		this.setFlowPanel(new DefaultFlowPanel());
	}
	if(!this.wizardElementsPanel){
		this.setWizardElementsPanel(new DefaultWizardElementsPanel());
	}
	this.setContent(this.layoutContainer.firstChild);
}

DefaultWizardLayout.prototype.setButtonPanel=function(buttonPanel,buttonPanelId){
	if(buttonPanelId){
		this.buttonPanelId = buttonPanelId ;
	}
	
	this.buttonPanel = buttonPanel ;
	if(this.buttonPanel.getContent()){
		this.setPanel(this.buttonPanelId,this.buttonPanel.getContent());
	}
	
}
DefaultWizardLayout.prototype.getButtonPanel=function(){
	return this.buttonPanel;
}


DefaultWizardLayout.prototype.setFlowPanel=function(flowPanel,flowPanelId){
	if(flowPanelId){
		this.flowPanelId = flowPanelId ;
	}
	this.flowPanel = flowPanel ;
	if(this.flowPanel.getContent()){
		this.setPanel(this.flowPanelId,this.flowPanel.getContent());
	}
}

DefaultWizardLayout.prototype.getFlowPanel=function(){
	return this.flowPanel;
}

DefaultWizardLayout.prototype.setWizardElementsPanel=function(wizardElementPanel,wizardElementId){
	if(wizardElementId){
		this.wizardElementId = wizardElementId ;
	}
	this.wizardElementPanel = wizardElementPanel;
	if(this.wizardElementPanel.getContent()  ){
		this.setPanel(this.wizardElementPanelId,this.wizardElementPanel.getContent() );
	}
}

DefaultWizardLayout.prototype.setPanel=function(id,panel){
 	var tds = this.layoutContainer.getElementsByTagName("TD")
 	for(var index=0; index<tds.length; index++) {
 		var td = tds[index];
 		if(td.getAttribute("id")==id){
			td.appendChild(panel);
		}
 	}
}


DefaultWizardLayout.prototype.getWizardElementsPanel=function(){
	return this.wizardElementPanel;
}



DefaultWizardLayout.prototype.setLayoutContent=function(htmlContent ,flowPanelId ,buttonPanelId ,wizardElementPanelId){
	if(buttonPanelId){
		this.buttonPanelId = buttonPanelId ;
	}
	if(flowPanelId){
		this.flowPanelId = flowPanelId ;
	}
	if(wizardElementPanelId){
		this.wizardElementPanelId = wizardElementPanelId;
	}
	if(htmlContent){
		this.layoutContainer = document.createElement("div");
		this.layoutContainer.innerHTML = this.htmlContent ;
		this.setContent(this.layoutContainer.firstChild);
	}
}

DefaultWizardLayout.prototype.getLayoutContent=function(){
	return this.htmlContent ;
}

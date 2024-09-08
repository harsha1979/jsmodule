DefaultFlowPanel.prototype = new Component();
function DefaultFlowPanel(){
	this.type= "DefaultFlowPanel";
	this.containerTable = document.createElement('<Table cellspacing="0" cellpadding="0" border="0" width="100%">');
	this.container=this.containerTable.insertRow().insertCell();
	//alert(dd.dd);
	this.h = "" ;
	this.init();
}
DefaultFlowPanel.prototype.init=function(){
	this.setContent(this.containerTable);
}
DefaultFlowPanel.prototype.drawFlow=function(wizard){
	this.h = '' ;
	this.h = this.flow(wizard);
	this.container.innerHTML = this.h;
}



DefaultFlowPanel.prototype.flow=function(element){
	var e = null ;
	var x = "" ;
	if(element){
		do {
			if(e==null){
				e = element.firstElement;
				x +='<TABLE border="0" width="100%" class="'+element.thisParent.themeName+'flowPanelTable" cellspacing="1" cellpadding="0">';
				x +='	<TR>';
				x +='		<TD colSpan="2" class="'+element.thisParent.themeName+'flowPanelElementHeadName">'+element.getName()+'</TD>';
				x +='	</TR>';
			}
			if(e.type=='Wizard'){
				x +='	<TR>';
				x +='		<TD colSpan="2">'+this.flow(e)+'</TD>';
				x +='	</TR>';
			}else{
				x +='	<TR height="20px">';
				if(e.getState()=="current"){
					x +='		<TD width="15px"  align="center"><img width="5px" height="9px" src="'+baseURL+'images/wizard/current.gif"/></TD>';
				}else if(e.getState()=="Success"){
					x +='		<TD width="15px"  align="center"><img width="10px" height="9px" src="'+baseURL+'images/wizard/right.gif"/></TD>';
				}else if(e.getState()=="Error"){
					x +='		<TD width="15px"  align="center"><img width="5px" height="9px" src="'+baseURL+'images/wizard/cross.gif"/></TD>';
				}else{
					x +='		<TD width="15px" align="center"><img width="5px" height="9px" src="'+baseURL+'images/wizard/default.gif"/></TD>';
				}
				x +='		<TD class="'+element.thisParent.themeName+'flowPanelElementName">'+e.getName()+'</TD>';
				x +='	</TR>';
			}
		} while ((e=e.getNextElement())!=null);
		
		x +='</TABLE>';
		return x ;
	}
}
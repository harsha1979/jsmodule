
function BorderLayout(){
	this.type="BorderLayout";
	this.table=document.createElement("<TABLE width='100%' height='100%'border='0' cellspacing='0' cellpadding='0'>");
	this.top=this.table.insertRow();
	this.north=this.top.insertCell();
	//this.north.align='center';
	
	this.middle=this.table.insertRow();
	this.middlePanel=this.middle.insertCell();
	this.middlePanel.width='100%';
	this.middlePanel.height='100%';
	
	this.tableMiddle=document.createElement("<TABLE width='100%' height='100%' border='0' cellspacing='0' cellpadding='0'>");
	this.middleRow=this.tableMiddle.insertRow();
	this.west=this.middleRow.insertCell();
	//this.west.align='center';
	
	this.center=this.middleRow.insertCell();
	//this.center.align='center';
	this.center.width='100%';
	this.center.height='100%';
	
	this.east=this.middleRow.insertCell();
	//this.east.align='center';
	
	this.middlePanel.insertAdjacentElement("afterBegin",this.tableMiddle);
	
	
	this.bottom=this.table.insertRow();
	this.south=this.bottom.insertCell();
	//this.south.align='center';

}

BorderLayout.prototype.setHgap=function(hGap){
	this.table.style.marginTop=hGap;
	this.table.style.marginBottom=hGap;
}
BorderLayout.prototype.setVgap=function(vGap){
	this.table.style.marginLeft=vGap;
	this.table.style.marginRight=vGap;
}

BorderLayout.prototype.setWestWidth=function(westWidth){
	this.west.width=westWidth;
}

BorderLayout.prototype.setWestHorizontalAlignment=function(hAlign){
	this.west.align=hAlign;
}

BorderLayout.prototype.setWestVerticalAlignment=function(vAlign){
	this.west.vAlign=vAlign;
}

BorderLayout.prototype.setEastWidth=function(eastWidth){
	this.east.width=eastWidth;
}

BorderLayout.prototype.setEastHorizontalAlignment=function(hAlign){
	this.east.align=hAlign;
}

BorderLayout.prototype.setEastVerticalAlignment=function(vAlign){
	this.east.vAlign=vAlign;
}

BorderLayout.prototype.setNorthHeight=function(northHeight){
	this.north.height=northHeight;
}

BorderLayout.prototype.setNorthHorizontalAlignment=function(hAlign){
	this.north.align=hAlign;
}

BorderLayout.prototype.setNorthVerticalAlignment=function(vAlign){
	this.north.vAlign=vAlign;
}

BorderLayout.prototype.setSouthHeight=function(southHeight){
	this.south.height=southHeight;
}

BorderLayout.prototype.setSouthHorizontalAlignment=function(hAlign){
	this.south.align=hAlign;
}

BorderLayout.prototype.setSouthVerticalAlignment=function(vAlign){
	this.south.vAlign=vAlign;
}

BorderLayout.prototype.setCenterHorizontalAlignment=function(hAlign){
	this.center.align=hAlign;
}

BorderLayout.prototype.setCenterVerticalAlignment=function(vAlign){
	this.center.vAlign=vAlign;
}



BorderLayout.prototype.getPane=function(){
	return this.table;
}
BorderLayout.prototype.setNorth=function(compNorth){
	if(this.north.firstChild){
			this.north.replaceChild(compNorth,this.north.firstChild);
	}else{		
			this.north.insertAdjacentElement("afterBegin",compNorth);
	}	
}
BorderLayout.prototype.setSouth=function(compSouth){
	if(this.south.firstChild){
			this.south.replaceChild(compSouth,this.south.firstChild);
	}else{		
			this.south.insertAdjacentElement("afterBegin",compSouth);
	}	
}
BorderLayout.prototype.setWest=function(compWest){
	if(this.west.firstChild){
			this.west.replaceChild(compWest,this.west.firstChild);
	}else{		
			this.west.insertAdjacentElement("afterBegin",compWest);
	}	
}
BorderLayout.prototype.setEast=function(compEast){
	if(this.east.firstChild){
			this.east.replaceChild(compEast,this.east.firstChild);
	}else{		
			this.east.insertAdjacentElement("afterBegin",compEast);
	}	
}
BorderLayout.prototype.setCenter=function(compCenter){
	if(this.center.firstChild){
			this.center.replaceChild(compCenter,this.center.firstChild);
	}else{		
			this.center.insertAdjacentElement("afterBegin",compCenter);
	}	
}


function Container(){

	this.type="Container";
	
	this.container=document.createElement("<TABLE border='0'  cellspacing='0' cellpadding='0'>");
	
	this.container.style.tableLayout="fixed";

}

Container.prototype.setLayoutType = function(layoutType){
	/*
		layoutTypes
		
		auto 	=Default. Column width is set by the widest unbreakable content in the column cells. 
		fixed =Table and column widths are set either by the sum of the widths on the col objects or, if these are not specified, by the width of the first row of cells. If no width is specified for the table, it renders by default with width=100%. 

	*/
	
	this.container.style.tableLayout=layoutType;
}

Container.prototype.getContentPane = function(){	
	return this.container
}

Container.prototype.setWidth = function(width){	
	 this.container.width=width;	
	
}

Container.prototype.setHeight = function(height){	
	 this.container.height=height;
}


Container.prototype.refreshLayout = function(){	
	
		if(this.layout){
			var dataPanel=this.container.rows[0];		
			if(dataPanel){
				
			}else{			
				var theTR=this.container.insertRow();
				var theTD=theTR.insertCell();
				theTD.width='100%';
				theTD.height='100%';
				dataPanel=this.container.rows[0];		
			}
			if(dataPanel.cells[0].firstChild){			
					dataPanel.cells[0].replaceChild(this.layout.getPane(),dataPanel.cells[0].firstChild);
			}else{			
					dataPanel.cells[0].insertAdjacentElement("afterBegin",this.layout.getPane());
			}
		}
}

Container.prototype.setLayout = function(layout){	
	
	this.layout=layout;
	this.refreshLayout();
}

Container.prototype.getLayout = function(){	
	
	return this.layout;
}

Container.prototype.setStyleName = function(name){	
	
	 this.container.className=name;

}

Container.prototype.setHorizontalAlignment = function(hAlign){	
	
	 this.container.align=hAlign;

}

Container.prototype.setVerticalAlignment = function(vAlign){	
	var dataPanel=this.container.rows[0];		
	if(dataPanel){			
		dataPanel.cells[0].vAlign=vAlign;
	}else{
	
	}
	 

}

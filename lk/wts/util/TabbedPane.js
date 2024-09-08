var container;
var arrComponents=null;
var tabPlacement;
var currentIndex=null;

//document.write("<script src='Table.js' language='javascript' type='text/javascript'></script>");
 
function TabbedPane(){
	TabbedPane(0);	
}

function TabbedPane(tabPlacement){
	this.tabPlacement=tabPlacement;
	var temp=document.createElement("<TABLE border='0' style='table-layout: fixed;' cellspacing='0' cellpadding='0'>");	
	
	temp.border=1;
	for(var i=0;i<2;i++){
		var aRow=temp.insertRow();		
		var aCell=aRow.insertCell();
		aCell.height='100%'
		aCell.width='100%'
		if(i==0)
			aCell.style.border=0;
	}
	this.container=temp;
	
}

TabbedPane.prototype.setWidth = function(width){
	this.container.width=width;	
}

TabbedPane.prototype.add = function(component){


}

TabbedPane.prototype.add = function(component,tabindex){


}




/*
TabbedPane.prototype.addTab = function(title,component,tip){
	

	

}

TabbedPane.prototype.addTab = function(title,component,tabindex){


}
*/

TabbedPane.prototype.setSelectedTabStyle=function(selectedStyle){

	this.selectedStyle=selectedStyle;
}

TabbedPane.prototype.setSelectedTab=function(index){

	var titlePanel=this.container.rows[0];
	titlePanel.cells[0].firstChild.cells[index].click();
	
}
TabbedPane.prototype.setTabStyle=function(tabStyle){

	this.tabStyle=tabStyle;
}

TabbedPane.prototype.addTab = function(title,component){
	var titlePanel=this.container.rows[0];
	var dataPanel=this.container.rows[1];
	var parentTabContainer=this;	
	
	if(dataPanel.cells[0].firstChild){
		dataPanel.cells[0].replaceChild(component,dataPanel.cells[0].firstChild);
	}else{		
		dataPanel.cells[0].insertAdjacentElement("afterBegin",component);		
	}
	
	
	
	
	if(titlePanel.cells[0].firstChild){
		var temp=document.createElement("<TABLE border='0' cellspacing='0' cellpadding='0'>");
		var aRow=temp.insertRow();		
		
		for(var i=0;i<titlePanel.cells[0].firstChild.cells.length+1;i++){					
			var aCell=aRow.insertCell();
			aCell.index=i;
			aCell.className="roomTD";
			aCell.width=100;
			if(i==titlePanel.cells[0].firstChild.cells.length){
				aCell.className=parentTabContainer.selectedStyle;
			}else{
				aCell.className=parentTabContainer.tabStyle;
			}
			aCell.onclick=function(){												
				if(currentIndex){
						if(currentIndex==this.index){
							return;
						}
				}												
				currentIndex=this.index;		
				this.className=parentTabContainer.selectedStyle;
				for(var t=0;t<this.parentElement.cells.length;t++){
					if(this.parentElement.cells[t]!=this){
						this.parentElement.cells[t].className=parentTabContainer.tabStyle;
					}
				}
				if(dataPanel.cells[0].firstChild){													
					dataPanel.cells[0].replaceChild(parentTabContainer.arrComponents[this.index],dataPanel.cells[0].firstChild);
				}else{															
					dataPanel.cells[0].insertAdjacentElement("afterBegin",parentTabContainer.arrComponents[this.index]);		
				}
			}

			if(i==titlePanel.cells[0].firstChild.cells.length){
				aCell.innerText=title;
			}else{
				aCell.innerText=titlePanel.cells[0].firstChild.cells[i].innerText;
			}
		}	
		
		titlePanel.cells[0].replaceChild(temp,titlePanel.cells[0].firstChild);	
		
	}else{
		var temp=document.createElement("<TABLE border='0' cellspacing='0' cellpadding='0'>");		
		var aRow=temp.insertRow();		
		var aCell=aRow.insertCell();
		aCell.innerText=title;
		
		titlePanel.cells[0].insertAdjacentElement("afterBegin",temp);
	}
	var arrTemp=new Array(titlePanel.cells[0].firstChild.cells.length);
	if(this.arrComponents){
		for(var t=0;t<arrTemp.length;t++){
			if(t==this.arrComponents.length){
				arrTemp[t]=component;
			}else{
				arrTemp[t]=this.arrComponents[t];
			}
		}
		this.arrComponents=arrTemp;
		
	}else{
		this.arrComponents=new Array(1);
		this.arrComponents[0]=component;
	}
}

TabbedPane.prototype.addTabbedPane = function(location){

	var loc=document.getElementById(location);
	if(loc.firstChild){
		loc.replaceChild(this.container,loc.firstChild);
	}else{		
		loc.insertAdjacentElement("afterBegin",this.container);		
	}	

}


sc=function onSelectionChange(index){
	if(currentIndex){
		if(currentIndex==index){
			return;
		}
	}else{
		currentIndex=index;
	
	}
	
	var titlePanel=this.container.rows[0];
	var dataPanel=this.container.rows[1];
	if(dataPanel.cells[0].firstChild){
		dataPanel.cells[0].replaceChild(this.arrComponents[index],dataPanel.cells[0].firstChild);
	}else{		
		dataPanel.cells[0].insertAdjacentElement("afterBegin",this.arrComponents[index]);		
	}
}



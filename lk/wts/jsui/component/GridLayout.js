
function GridLayout(rows,cols){

	this.table=document.createElement("<TABLE width='100%' border='0' cellspacing='0' cellpadding='0'>");
	for(var r=0;r<rows;r++){
		var theTR=this.table.insertRow();
		for(var c=0;c<cols;c++){
			var theTD=theTR.insertCell();
			theTD.align='center';
		}
	}
}

GridLayout.prototype.add=function(aRowNo,aColumnNo,aComp){
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];
	var comp;
	if(typeof(aComp)=='string' || typeof(aComp)=='number'){			
		var comp=document.createElement("<font>");		
		comp.innerText=aComp;
	}else{
		comp=aComp;		
	}
	if(theCell.firstChild){
		theCell.replaceChild(comp,theCell.firstChild);
	}else{		
		theCell.insertAdjacentElement("afterBegin",comp);
	}	
}
GridLayout.prototype.addHTML=function(aRowNo,aColumnNo,html){
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];
  theCell.innerHTML = html;
}


GridLayout.prototype.append=function(aRowNo,aColumnNo,aComp){	
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];		
	theCell.insertAdjacentElement("beforeEnd",aComp);	
	
}

GridLayout.prototype.setCellStyle=function(aRowNo,aColumnNo,className){
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];
	theCell.className=className;
}

GridLayout.prototype.setCellWidth=function(aRowNo,aColumnNo,width){
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];
	theCell.width=width;
}

GridLayout.prototype.setCellHeight=function(aRowNo,aColumnNo,height){
	var theCell=this.table.rows[aRowNo].cells[aColumnNo];
	theCell.height=height;
}

GridLayout.prototype.setRowStyle=function(aRowNo,className){
	
	for(var i=0;i<this.table.rows[aRowNo].cells.length;i++){
		this.table.rows[aRowNo].cells[i].className=className;
	}	
}


GridLayout.prototype.setColumnStyle=function(aColumnNo,className){
	for(var j=0;j<this.table.rows.length;j++)	{			
		this.table.rows[j].cells[aColumnNo].className=className;			
	}
}
GridLayout.prototype.getPane=function(){
	return this.table;
}

GridLayout.prototype.setHorizontalAlignmentAt=function(rowNo,cellNo,hAlign){
	this.table.rows[rowNo].cells[cellNo].align=hAlign;
}

GridLayout.prototype.setVerticalAlignmentAt=function(rowNo,cellNo,vAlign){
	this.table.rows[rowNo].cells[cellNo].vAlign=vAlign;
}
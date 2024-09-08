
function Table(data,colNames,cols){	
	this.data=data;
	this.colNames=colNames;
	var parent=this;	
	this.columns=cols;
	this.isSelectable=false;
}

Table.prototype.getTable=function(){

	return this.table;
}

Table.prototype.setHeaderClassName=function(headerClass){

	this.headerClassName=headerClass;
}

Table.prototype.setSortEnable=function(sortEnable){

	this.sortEnable=sortEnable
}

Table.prototype.setCellStyle=function(rowNo,colNo,className){

	this.table.rows[rowNo].cells[colNo].className=className;
}

Table.prototype.setHeaderFreeze=function(bool){

	this.freezeHeader=bool;
}

Table.prototype.createTable=function(){

	var tempTable=document.createElement("TABLE");
	if(this.tableStyleName){
		tempTable.className  = this.tableStyleName ;
	}
	if(this.width){
		tempTable.width=this.width;
	}
	

	//tempTable.border='1';
	tempTable.cellPadding=0;
	tempTable.cellSpacing=0;
	var parentTable=this;	
	var data=this.data;	
	var colNames=this.colNames;
	var arrCols=this.columns;
	var topTable=tempTable;
	if(colNames){
		var aRow=tempTable.insertRow();
		for(var j=0;j<colNames.length;j++){
			var aCell=aRow.insertCell();
			if(typeof(colNames[j])=='string'){
				aCell.innerHTML=colNames[j];
			}else{
				aCell.innerHTML=colNames[j].toString();
			}

			aCell.sortType="A";
			aCell.colNo=j;
			if(arrCols && arrCols[j]){
				aCell.width=arrCols[j].getColumnWidth();
			}
			if(this.headerClassName){
				aCell.className=this.headerClassName;
			}
			if(this.sortEnable){
				aCell.onclick=function(){	
													var array2d=new Array2D();													
													if(this.sortType=="A"){														
														var newArray=array2d.sortAsending(parentTable.data,this.colNo,parentTable.columns[this.colNo].getColumnType());
														this.sortType=="D";
													}else{
														var newArray=array2d.sortDesending(parentTable.data,this.colNo,parentTable.columns[this.colNo].getColumnType());
														this.sortType="A";
													}	
													parentTable.setData(newArray);
													parentTable.createTable();

											}
			}
		}

		if(this.freezeHeader){

			aRow=tempTable.insertRow();
			//alert("kkk");					
			var aCell=aRow.insertCell();
			//alert(colNames.length);
			aCell.colSpan=colNames.length;


			var sp = new JSScrollPane();
	
			sp.createJSScrollPane('both');
	
			//sp.setWidth(this.width);
			
			if(this.width){

				sp.setSize(eval(this.width)+12,eval(this.height));
			}
		
			myScrollPane = sp.getJSScrollPane();
			//var borderLayout=new BorderLayout();
			//borderLayout.setCenter(myScrollPane);
			tempTable=document.createElement("TABLE");
			tempTable.cellPadding=0;
			tempTable.cellSpacing=0;

			if(this.width){
				tempTable.width=this.width-4;
			}
			
			sp.add(tempTable);		
			//tempTable.border='1';
			if(aCell.firstChild){			
					aCell.replaceChild(myScrollPane,aCell.firstChild);
			}else{			
					aCell.insertAdjacentElement("afterBegin",myScrollPane);
			}			
		}
	}	
	//alert(data);

	for(var i=0;i<data.length;i++){
		var aRow=tempTable.insertRow();
		//if(i==0){
			
		//}

		for(var j=0;j<data[i].length;j++){
			var aCell=aRow.insertCell();			
			if(typeof(data[i][j])=='string' || typeof(data[i][j])=='number'){			
				if(data[i][j]==""){
					aCell.innerHTML="&nbsp;";
				}else{
					//aCell.innerHTML="<nobr>"+data[i][j]+"</nobr>";	
					aCell.innerHTML=data[i][j];	
				}
			}else{
				if(aCell.firstChild){			
						aCell.replaceChild(data[i][j],aCell.firstChild);
				}else{			
						aCell.insertAdjacentElement("afterBegin",data[i][j]);
				}			
			}
			if(colNames){
				aCell.rowNo=i+1;
				aCell.columnNo=j+1;	
			}else{
				aCell.rowNo=i;
				aCell.columnNo=j;	
			}
			if(arrCols && arrCols[j]){			
				aCell.tableColumn=arrCols[j];
				if(arrCols[j].getColumnStyle()){
					aCell.className=arrCols[j].getColumnStyle();
				}else if(parentTable.cellStyleName){
					aCell.className=parentTable.cellStyleName;
				}
				if(arrCols[j].getColumnWidth()!="")
					aCell.width=arrCols[j].getColumnWidth();				
			}else{
				aCell.className=parentTable.cellStyleName;
			}
			
			if(this.onMouseOverEventHandler){
				aCell.onmouseover=this.onMouseOverEventHandler;
			}
			if(this.onMouseOutEventHandler){
							aCell.onmouseout=this.onMouseOutEventHandler;
			}
		
			aCell.onclick=function(){
			//alert(ddggh.hnnh);
										parentTable.row=this.rowNo;
										parentTable.col=this.columnNo;
										var pTR=this.parentElement;	
										var tableColumn=this.tableColumn;		
										
										if(parentTable.isSelectable){										
											
											for(var k=0;k<pTR.cells.length;k++){
												if(typeof (parentTable.selectedCellStyleName)!='undefined'){																							
													pTR.cells[k].className=parentTable.selectedCellStyleName;												
												}
											}
											var h=0;
											if(parentTable.colNames){
												h=1;
											}										
											for(;h<tempTable.rows.length;h++){
												for(var k=0;k<tempTable.rows[h].cells.length;k++){
													if(tempTable.rows[h]==pTR){
														break;													
													}else{													
														if(parentTable.columns && parentTable.columns[k] && parentTable.columns[k].getColumnStyle()){				
															tempTable.rows[h].cells[k].className=parentTable.columns[k].getColumnStyle();
															tempTable.rows[h].cells[k].width=parentTable.columns[k].getColumnWidth();				
														}else{
															tempTable.rows[h].cells[k].className=parentTable.cellStyleName;
														}
													}
												}
											}
										}
									}
			aCell.ondblclick=function(){						
													parentTable.row=this.rowNo;
													parentTable.col=this.columnNo;
													var pTR=this.parentElement;	
													var tableColumn=this.tableColumn;	
													if(tableColumn)
														tableColumn.onDblClick(this);
													if(parentTable.isSelectable){	
														for(var k=0;k<pTR.cells.length;k++){
																if(typeof (parentTable.selectedCellStyleName)!='undefined'){																							
																	pTR.cells[k].className=parentTable.selectedCellStyleName;

																}
														}			
														for(var h=1;h<tempTable.rows.length;h++){
															for(var k=0;k<tempTable.rows[h].cells.length;k++){
																if(tempTable.rows[h]==pTR){
																	break;																
																}else{													
																	if(parentTable.columns && parentTable.columns[k]){				
																		tempTable.rows[h].cells[k].className=parentTable.columns[k].getColumnStyle();
																		tempTable.rows[h].cells[k].width=parentTable.columns[k].getColumnWidth();				
																	}else{
																		tempTable.rows[h].cells[k].className=parentTable.cellStyleName;
																	}
																}
															}
														}
													}
												}
		}
	}
	this.dataTable=tempTable;
	if(this.table){		
		this.table.replaceNode(topTable);
		this.table=topTable;
	}else{	  
		this.table=topTable;
	}	
	this.table.objectParent=this;
}

Table.prototype.setSelectedCellStyleName = function(name){	
	this.selectedCellStyleName=name;
}

Table.prototype.setColumns = function(cols){	
	this.columns=cols;
}

Table.prototype.setData = function(data){	
	this.data=data;
}
Table.prototype.setColNames = function(colNames){	
	this.colNames=colNames;
}
Table.prototype.setRowStyleName = function(rowNo,styleName){	
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	
	if(dataTable.rows[rowNo]){
		for(var i=0;i<dataTable.rows[rowNo].cells.length;i++){
			dataTable.rows[rowNo].cells[i].className=styleName;
		}
	}
	
	
}

Table.prototype.refresh = function(newTable){	
	newTable.setSelectedCellStyleName(this.selectedCellStyleName);
	newTable.setCellStyleName(this.cellStyleName);		
	newTable.createTable();
	this.table.replaceNode(newTable.table);	
	newTable.table.rows[this.row+1].cells[0].click();
	//this=new Table();	
}

Table.prototype.setCellStyleName = function(name){	
	this.cellStyleName=name;	
}
Table.prototype.setTableStyleName = function(name){	
	this.tableStyleName=name;	
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	if(dataTable){
		dataTable.className = name ;
	}
	
}


Table.prototype.getCellStyleName = function(){	
	return this.cellStyleName;	
}
Table.prototype.setBorder = function(border){	
		// "color size style"
	this.table.style.border=border;	
}

Table.prototype.getSelectedRow = function(){
	if(isNaN(this.row)){
		return -1;
	}else{
		return this.row;
	}	
}

Table.prototype.setColumnEventHandler = function(columnNo,eventHandler){
	
	var i=0;
	if(this.colNames){
		i=1;
	}
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	for(;i<dataTable.rows.length;i++){
		var tempTD=dataTable.rows[i].cells[columnNo];
		if(tempTD){
			tempTD.onclick=eventHandler;			
		}
	}
}

Table.prototype.setRowEventHandler = function(eventHandler){
	if(this.table.rows){
		var i=0;
		if(this.colNames){
			i=1;
		}
		var dataTable=null;	
		if(this.freezeHeader){
			dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
		}else{
			dataTable=this.table;		
		}
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			tempTR.onclick=eventHandler;		
		}
	}
}

Table.prototype.setRowDblClick = function(eventHandler){

	var i=0;
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;	
		if(this.colNames){
					i=1;
		}
	}
	if(dataTable.rows){				
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			tempTR.ondblclick=eventHandler;				
		}
	}
}

Table.prototype.setAltForColumn = function(colNo,text){	
	var dataTable=null;	
	var i=0;
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
		if(this.colNames){
				i=1;
		}
	}
		
	if(dataTable.rows){			
		for(;i<dataTable.rows.length;i++){
			dataTable.rows[i].cells[colNo].alt=text;	
		}		
	}
	return null;
}

Table.prototype.setTableWidth = function(width){
	
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	if(width!=""){
		if(dataTable){
			dataTable.width=width;				
		}
		this.width=width;		
	}
}

Table.prototype.setTableHeight = function(height){
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	if(height!=""){
		if(dataTable){
			dataTable.height=height;				
		}
		this.height=height;		
	}
		
}

Table.prototype.setTableCellSapacing = function(spacing){
	if(styleName!="")
		this.table.cellSpacing=spacing;		
}

Table.prototype.setTableCellPadding = function(padding){
	if(styleName!="")
		this.table.cellPadding=padding;		
}

Table.prototype.setHorizontalAlignment = function(hAlign){	
	
	 this.table.align=hAlign;

}

Table.prototype.getData=function(){

	var dataTable=null;	
	var i=0;
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
		if(this.colNames){
				i=1;
		}
	}
	
	
	var tempData=null;	
	tempData=[];
	
	for(;i<dataTable.rows.length;i++){
		tempData[tempData.length]=new Array(dataTable.rows[i].cells.length);
		for(var j=0;j<tempData[i].length;j++){
			if(dataTable.rows[i].cells[j].firstChild){	
				tempData[i][j]=dataTable.rows[i].cells[j].firstChild;				
			}else{				
				tempData[i][j]=dataTable.rows[i].cells[j].innerText;
			}
		}
	}
	return tempData;
}
Table.prototype.getDataAtSelectedRow=function(){

	var selectedRow=this.getSelectedRow();
	
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
	}
	
	if(selectedRow>=0){
		var tempData=new Array(dataTable.rows[selectedRow].cells.length);
		for(var i=0;i<tempData.length;i++){		
			if(dataTable.rows[selectedRow].cells[i].firstChild){								
				if(typeof(dataTable.rows[selectedRow].cells[i].innerHTML)=="string"){
					tempData[i]=dataTable.rows[selectedRow].cells[i].innerText;
				}else{
					tempData[i]=dataTable.rows[selectedRow].cells[i].firstChild;
				}
			}else{
				tempData[i]=dataTable.rows[selectedRow].cells[i].innerText;
			}		
		}
		return tempData;
	}else{
		return null;
	}
}

Table.prototype.setIsTableCellSelecteable=function(value){
	this.isSelectable=value;
}
Table.prototype.setTableCellOnmouseOver=function(eventHandler){

	this.onMouseOverEventHandler=eventHandler;
	var dataTable=null;	
	var i=0;
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;
		if(this.colNames){
					i=1;
		}	
	}		
	if(dataTable.rows){			
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			tempTR.onmouseover=eventHandler;		
		}
	}
}
Table.prototype.setTableCellOnmouseOut=function(eventHandler){
	this.onMouseOutEventHandler=eventHandler;
	var dataTable=null;	
	var i=0;
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;
		if(this.colNames){
				i=1;
		}	
	}
	
	if(dataTable.rows){		
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			tempTR.onmouseout=eventHandler;		
		}
	}
}

Table.prototype.setTableColumnOnMouseOver=function(eventHandler){
	this.onMouseOverEventHandler=eventHandler;
	var i=0;
	var dataTable=null;	
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;		
		if(this.colNames){
				i=1;
		}	
	}	
	
	if(dataTable.rows){		
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			for(var j=0; j<tempTR.cells.length; j++) {
				var tempTD=tempTR.cells[j];	
				tempTD.onmouseover=eventHandler;
			}
					
		}
	}
}
Table.prototype.setTableColumnOnMouseOut=function(eventHandler){
	this.onMouseOutEventHandler=eventHandler;
	var dataTable=null;	
	var i=0;
	if(this.freezeHeader){
		dataTable=this.table.rows[1].getElementsByTagName("table")[0];		
	}else{
		dataTable=this.table;
		if(this.colNames){
				i=1;
		}	
	}
	if(dataTable.rows){		
		for(;i<dataTable.rows.length;i++){
			var tempTR=dataTable.rows[i];		
			for(var j=0; j<tempTR.cells.length; j++) {
				var tempTD=tempTR.cells[j];	
				tempTD.onmouseout=eventHandler;
			}	
		}
	}
}
Table.prototype.setTableCellOnMouseOut=function(rowNo,colNo,eventHandler){
	
	if(this.table.rows){
		this.table.rows[rowNo].cells[colNo].onmouseout=eventHandler;		
	}
}
Table.prototype.setTableCellOnMouseOver=function(rowNo,colNo,eventHandler){
	
	if(this.table.rows){
		this.table.rows[rowNo].cells[colNo].onmouseover=eventHandler;		
	}
}

/*
Table.prototype.setVerticalAlignment = function(vAlign){	
	
	 this.table.vAlign=vAlign;

}
*/






function JSView(jscontroller){
	this.type = "JSView" ;
	this.jscontroller = jscontroller ;
	this.viewDiv = null ;
}

JSView.prototype.setData=function(xmldom){
	this.xmldom = xmldom ;
}


JSView.prototype.getView=function(){
		
	this.jscontroller.dataSet = new HashMap();
	this.jscontroller.elementNameSet = new Array();
		
	this.viewDiv = document.createElement("div");
	
	this.viewDiv.style.position ='absolute';
	this.viewDiv.style.zIndex =150;
//	style="z-index: 1"
	//alert(dd.dd);
	var len = this.jscontroller.tableHeadersColl.length ;
	var tableWidth = 0 ;
	//var columnNames = new Array(len);
	var columnNames = new Array(this.jscontroller.tableHeadersColl.length);
	for(var index=0; index<this.jscontroller.tableHeadersColl.length; index++) {
		columnNames[index] = this.jscontroller.tableHeadersColl[index][0];
		if(this.jscontroller.tableHeadersColl[index][1]!= null  && this.jscontroller.tableHeadersColl[index][1]!=''){
			tableWidth += eval(this.jscontroller.tableHeadersColl[index][1]) ;
		}else{
			tableWidth += 100 ;
		}
	}
	//alert(tableWidth);
	//columnNames = this.jscontroller.tableHeadersColl ;
	var datas=new Array();
	
	
	//var columnWidth = viewWidth/len;
	
	
	if(this.xmldom.xml!=''){
		var collumns=new Array(len);
		var records = this.xmldom.firstChild.childNodes;
		var dataTable=null; 
		for(var i=0; i<records.length; i++) {
			var record = records[i] ;
			var childs = record.childNodes ;
			var data = new Array(len);
			var dataSetArray = new Array();
			var keyValue = null ;
		
			for(var j=0; j<childs.length; j++) {
				var child = childs[j];
				var fieldName = child.nodeName;
				var fieldValue = child.nodeTypedValue ;
				
				if(i==0){
					this.jscontroller.elementNameSet.push(fieldName);
				}
				if(this.jscontroller.key==fieldName){
					keyValue = fieldValue ;
				}
				dataSetArray.push(fieldValue);
				
				var index = contain(this.jscontroller.tableHeadersColl,fieldName) ;
				if(index!=-1){
					if(i==0){
						var aColumn=new TableColumn(this.jscontroller.tableHeadersColl[index][1]+"px","string",null); 
						collumns[index]=aColumn;
					}
					
					if(fieldValue==null || fieldValue==undefined){
						fieldValue = "";
					}
					data[index]=fieldValue ;
				}
			}
			
			this.jscontroller.dataSet.put(i,dataSetArray);
			datas[i]=data ;
		}
		
		if(this.jscontroller.isViewHeader=='true'){
			dataTable=new Table(datas,columnNames,collumns);
			dataTable.setHeaderClassName(this.jscontroller.controllerHeaderStyle);
		}else{
			dataTable=new Table(datas,null,collumns); 
		}
		dataTable.setTableWidth(tableWidth);
		dataTable.setTableStyleName(this.jscontroller.dataTableStyle);
		dataTable.setCellStyleName(this.jscontroller.dataRowStyle);
		
		
		dataTable.createTable();
		dataTable.controller  =  this.jscontroller ;
		
		dataTable.table.style.zIndex =500;
		
		dataTable.setRowDblClick(this.selectDataRaw);
		
		dataTable.setTableCellOnmouseOver(this.cellOnMouseOver);
		dataTable.setTableCellOnmouseOut(this.cellOnMouseOut);
		
		
		
		this.viewDiv.datatable = dataTable ;
		
		this.viewDiv.insertAdjacentElement("AfterBegin",dataTable.table);
	}
		//alert(table.table.outerHTML);
	
	var datasController=new Array(new Array("Prev","Next","Close")); 
	var aColumnController1=new TableColumn('33%',"string",this.jscontroller.controllerCellStylePrev); 
	var aColumnController2=new TableColumn('33%',"string",this.jscontroller.controllerCellStyleNext); 
	var aColumnController3=new TableColumn('33%',"string",this.jscontroller.controllerCellStyleClose);
	var collumnsController=new Array(aColumnController1,aColumnController2,aColumnController3); 
	var tableController=new Table(datasController,null,collumnsController); 
	
	tableController.setTableStyleName(this.jscontroller.controllerTableStyle);
	//tableController.setCellStyleName(this.jscontroller.controllerCellStyle);
	//tableController.
	//textAlign
	
	
	tableController.createTable();
	tableController.table.width = '150px';
	
	
	this.viewDiv.tableController = tableController ;
	
	tableController.setColumnEventHandler(0,this.prevView);
	tableController.setColumnEventHandler(1,this.nextView);
	tableController.setColumnEventHandler(2,this.closeView);
	
	tableController.setTableCellOnMouseOut(0,0,this.controllerPrevOnMouseOut);
	tableController.setTableCellOnMouseOut(0,1,this.controllerNextOnMouseOut);
	tableController.setTableCellOnMouseOut(0,2,this.controllerCloseOnMouseOut);
	
	tableController.setTableCellOnMouseOver(0,0,this.controllerPrevOnMouseOver);
	tableController.setTableCellOnMouseOver(0,1,this.controllerNextOnMouseOver);
	tableController.setTableCellOnMouseOver(0,2,this.controllerCloseOnMouseOver);
	
	//alert(tableController.table.outerHTML);
	
	this.viewDiv.insertAdjacentElement("BeforeEnd",tableController.table);
	document.body.appendChild(this.viewDiv);
	if(dataTable){
		if(dataTable.table.offsetWidth<tableController.table.offsetWidth ){
			dataTable.table.width = tableController.table.offsetWidth ;
		}else{
			tableController.table.width = dataTable.table.offsetWidth ;
		}
	}
	this.viewDiv.jsview = this ;
	return this.viewDiv ;
}




JSView.prototype.nextView=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	viewDiv.jsview.jscontroller.nextData();
}

JSView.prototype.prevView=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	viewDiv.jsview.jscontroller.prevData();
}
JSView.prototype.closeView=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	
	viewDiv.jsview.jscontroller.start = 1 ;
	viewDiv.jsview.jscontroller.end = viewDiv.jsview.jscontroller.start + viewDiv.jsview.jscontroller.range;
	var comp = document.getElementById(viewDiv.jsview.jscontroller.id);
	comp.value = '' ;
	viewDiv.removeNode(true);
}

JSView.prototype.selectDataRaw=function(){
	var viewDiv = this.parentElement.parentElement.parentElement ;
	var selectedData = viewDiv.datatable.getDataAtSelectedRow() ;
	var dKey = viewDiv.datatable.getSelectedRow();
	if(viewDiv.jsview.jscontroller.isViewHeader=='true'){
		dKey = dKey-1 ;
	}
	var selectedDataArray = viewDiv.jsview.jscontroller.dataSet.get(dKey);
	viewDiv.jsview.jscontroller.selectData(selectedDataArray);
}
JSView.prototype.cellOnMouseOut=function(){
	var viewDiv = this.parentElement.parentElement.parentElement ;
	viewDiv.datatable.setRowStyleName(this.childNodes[0].rowNo,viewDiv.jsview.jscontroller.dataRowStyle);
}
JSView.prototype.cellOnMouseOver=function(){
	var viewDiv = this.parentElement.parentElement.parentElement ;
	viewDiv.datatable.setRowStyleName(this.childNodes[0].rowNo,viewDiv.jsview.jscontroller.dataMouseOverRowStyle);
}

JSView.prototype.controllerPrevOnMouseOut=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerCellStylePrev);
}
JSView.prototype.controllerPrevOnMouseOver=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	//alert(dd.dd);
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerMouseOverPrevStyle);
}
JSView.prototype.controllerNextOnMouseOut=function(){
	//alert(this.columnNo,viewDiv.jsview.jscontroller.controllerCellStyleNext);
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerCellStyleNext);
}
JSView.prototype.controllerNextOnMouseOver=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	//alert(dd.dd);
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerMouseOverNextStyle);
}
JSView.prototype.controllerCloseOnMouseOut=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerCellStyleClose);
}
JSView.prototype.controllerCloseOnMouseOver=function(){
	var viewDiv = this.parentElement.parentElement.parentElement.parentElement ;
	//alert(dd.dd);
	viewDiv.tableController.setCellStyle(this.rowNo,this.columnNo,viewDiv.jsview.jscontroller.controllerMouseOverCloseStyle);
}

JSView.prototype.remove=function(){
	if(this.viewDiv){
		this.viewDiv.removeNode(true);
	}

}

function contain(array,value){
	for(var index=0; index<array.length; index++) {
		if(replaceSpaces(array[index][0])==value){
			return index ;
		}
	}
	return -1 ;
}
function replaceSpaces(str){
	var retStr = "";
	for(var index=0; index<str.length; index++) {
		if(str.charCodeAt(index)!=32){
			retStr += str.charAt(index);
		}
	}
	return retStr ;
}


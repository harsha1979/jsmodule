
function TableColumn(){
	this.header="Column";

}
function TableColumn(width,type,style,align){
	//this.header=header;
	this.width=width;
	this.type=type;
	this.style=style;
	this.align = align ;
}
 
/*
TableColumn.prototype.setColumnHeader=function(header){

	this.header=header;
	
}

TableColumn.prototype.getColumnHeader=function(){

	return this.header;
	
}
*/

TableColumn.prototype.setColumnWidth=function(width){

	this.width=width;
	
}

TableColumn.prototype.getColumnWidth=function(){

	return this.width;
	
}

TableColumn.prototype.setColumnType=function(type){

	this.type=type;
	
}

TableColumn.prototype.getColumnType=function(){

	return this.type;
	
}

TableColumn.prototype.setColumnStyle=function(style){

	this.style=style;
	
}

TableColumn.prototype.getColumnStyle=function(){

	return this.style;
	
}

TableColumn.prototype.setCellEditor=function(editor){

	this.editor=editor;
	
}

TableColumn.prototype.onDblClick=function(obj){
	if(this.editor)
		this.editor.onDblClick(obj,this.type);
	
}
TableColumn.prototype.onClick=function(obj){
	if(this.editor)
		this.editor.onClick(obj);
	
}
TableColumn.prototype.getAlignPoperty=function(){
	//if(this.align)
	return this.align ;
}



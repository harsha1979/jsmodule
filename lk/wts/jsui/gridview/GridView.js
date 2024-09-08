wts.using("lk.wts.util.Table");


function GridView(dataCollection,colNames,displayNames){	
	this.dataArray=dataCollection.toArray();
	this.colNames=colNames;
	this.displayNames=displayNames;
	
	this.draw();
}
GridView.prototype.draw=function(){
	var data=new Array(this.dataArray.length);		
	for(var i=0;i<this.dataArray.length;i++){
		data[i]=new Array(this.colNames.length);
		for(var j=0;j<this.colNames.length;j++){
			data[i][j]=this.dataArray[i]["get"+this.colNames[j]]();
		}
	}
	this.table=new Table(data,this.displayNames,null);
	this.table.setTableStyleName("testStyle");
	this.table.createTable();
	
	
}
GridView.prototype.getGridView=function(){
	return this.table.getTable();
}

GridView.prototype.getSelected=function(){

}
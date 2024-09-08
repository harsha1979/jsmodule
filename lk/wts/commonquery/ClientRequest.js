/*
 * This class represent the ClientRequestVO of the domain model
 * 
 */
function ClientRequest(){
	this.type = 'ClientRequest'; 
	this.dataType = null;
	this.selectOp   = null;
	this.deleteOp = null;
	this.updateOp   = null;
	this.insertOp   = null;				
}

ClientRequest.prototype.setDataType=function(dataType){
	this.dataType = dataType;
}

ClientRequest.prototype.getDataType=function(){
	return this.dataType;
}

ClientRequest.prototype.setSelect=function(select){
	if(select.type=='Select'){
		this.selectOp = select;		
	}
}

ClientRequest.prototype.getSelect=function(){
	return this.selectOp;
}

ClientRequest.prototype.setDelete=function(deleteOp){
	if(deleteOp.type=='Delete'){
		this.deleteOp = deleteOp;
	}
}

ClientRequest.prototype.getDelete=function(){
	return this.deleteOp;
}

ClientRequest.prototype.setUpdate=function(update){
	if(update.type=='Update'){
		this.updateOp = update;		
	}
}

ClientRequest.prototype.getUpdate=function(){
	return this.updateOp;
}

ClientRequest.prototype.setInsert=function(insert){
	if(insert.type=='Insert'){
		this.insertOp = insert;
	}
}

ClientRequest.prototype.getInsert=function(){
	return this.insertOp;
}

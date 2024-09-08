/*
 * This class represents the t.InsertVO class of the domain model
 */
function Insert(){	
	this.type="Insert"; 
	this.data = null;
}

Insert.prototype.setData= function(data){
	this.data = data;	
}

Insert.prototype.getData= function(){
	return this.data;
}

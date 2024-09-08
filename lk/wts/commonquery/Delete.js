/*
 * This class represents the t.DeleteVO class of the domain model 
 */
function Delete(){	
	this.type="Delete"; 
	this.parameter = null;
	this.data = null;
}

Delete.prototype.setParameter= function(parameter){
	if(parameter.type=='Parameter' || parameter.type=='Param'){
		this.parameter = parameter;			
	}
}

Delete.prototype.getParameter= function(){
	return this.parameter;
}

Delete.prototype.setData= function(data){
	this.data = data;	
}

Delete.prototype.getData= function(){
	return this.data;
}

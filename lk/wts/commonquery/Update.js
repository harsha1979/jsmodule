/**
 * This class reperents the t.UpdateVO in the domain model
 */
function Update(){	
	this.type="Update"; 
	this.parameter = null;
	this.data = null;
}

Update.prototype.setParameter= function(parameter){
	if(parameter.type=='Parameter' || parameter.type=='Param'){
		this.parameter = parameter;			
	}
}

Update.prototype.getParameter= function(){
	return this.parameter;
}

Update.prototype.setData= function(data){
	this.data = data;	
}

Update.prototype.getData= function(){
	return this.data;
}

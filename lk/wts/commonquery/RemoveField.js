/*
 * This class represent the RemoveFieldVO of the domain model
 * This is used by the SelectContent class to add a perticuler 
 * fiels as an RemoveField object to the removed collection
 *  
 */
 
function RemoveField(){
	this.type = 'RemoveField'; 
	this.field = null;
}

RemoveField.prototype.setField=function(field){
	this.field = field;
}
 
RemoveField.prototype.getField=function(){
	return this.field;
}

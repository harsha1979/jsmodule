/* 
 * This class represent the AddFieldVO of the domain model
 * This is used by the SelectContent class to add a perticular
 * fiels as an AddField object to the content collection
 *  
 */
 
function AddField(){
	this.type = 'AddField'; 
	this.field = null;
}

AddField.prototype.setField=function(field){
	this.field = field;
}
 
AddField.prototype.getField=function(){
	return this.field;
}
 
 
 

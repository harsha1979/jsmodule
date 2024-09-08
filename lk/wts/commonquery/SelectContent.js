wts.using('lk.wts.util.*;');
/*
 * This class represents the lk.wts.dao.SelectContent class of the domain model
 * 
 */
function SelectContent(clazz){
	this.type = 'SelectContent'; 
	this.addFields = new HashSet();
	this.removeFields= new HashSet();	
	this.Class = clazz || "";	
		
}

SelectContent.prototype.setAddFields = function(addFields){
		this.addFields = addFields;
}

SelectContent.prototype.getAddFields = function(){
	return this.addFields;
}

SelectContent.prototype.setRemoveFields = function(removeFields){
	this.removeFields = removeFields;
}

SelectContent.prototype.getRemoveFields = function(){
	return this.removeFields;
}

SelectContent.prototype.setAddField = function(addField){
	if(addField!=null){
		this.addFields.add(addField);
	}
}

SelectContent.prototype.setRemoveField = function(removeField){
	if(removeField!=null){
		this.removeFields.add(removeFields);
	}
}




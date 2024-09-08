/*
 * This class represent the SelectVO of the domain model
 * It is the class contains data for a perticuler sql "SELECT" db operation
 */
function Select(){	
	this.type="Select"; 
	this.parameter = null;
	this.selectContent = null;
	this.recordRange = null;
	this.depth = 0;	
}

Select.prototype.setParameter= function(parameter){
	if(parameter.type=='Parameter'){
		this.parameter = parameter;			
	}
}

Select.prototype.getParameter= function(){
	return this.parameter;
}

Select.prototype.setSelectContent= function(selectContent){
	if(selectContent.type=='SelectContent'){
		this.selectContent = selectContent;	
	}
}

Select.prototype.getSelectContent= function(){
	return this.selectContent;
}

Select.prototype.setRecordRange= function(recordRange){
	if(recordRange.type=='RecordRange'){
		this.recordRange = recordRange;	
	}
}

Select.prototype.getRecordRange= function(){
	return this.recordRange;
}

Select.prototype.setDepth= function(depth){
	if(parseInt(depth)>=0){
		this.depth = depth;	
	}
}

Select.prototype.getDepth= function(){
	return this.depth;
}

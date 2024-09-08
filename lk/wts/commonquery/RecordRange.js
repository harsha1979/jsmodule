/**
 * This class represents the RecordRangeVO class in the domain model
 */
function RecordRange(start,count){	
	this.type="RecordRange"; 
	this.start = start || -1;
	this.count = count || -1;
}

RecordRange.prototype.setStart = function(start){
	this.start = start;	
}

RecordRange.prototype.getStart = function(){
	return this.start;
}

RecordRange.prototype.setCount = function(count){
	this.count = count;	
}

RecordRange.prototype.getCount= function(){
	return this.count;
}



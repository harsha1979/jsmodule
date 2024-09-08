function Parameter(key,value,dataType,comparison,criteria){	
	this.type="Parameter"; 	
	this.key = key || null ;
	this.value = value||null;
	this.dataType = dataType||null;
	this.comparison = comparison||null;	
	this.criteria= criteria||null;				
	this.parameter = null;
}

Parameter.prototype.setParameter = function(nextParameter){
	if(nextParameter.type=='Parameter'){
		this.parameter = nextParameter;
	}
}

Parameter.prototype.getParameter = function(){
	return this.parameter;
}


Parameter.prototype.setComparison = function(comparison){
	/*
	 * EQUAL=0;
	 * LIKE_START=1
	 * LIKE_END=2
	 * LIKE=3
	 */
	this.comparison = comparison;
}

Parameter.prototype.getComparison=function(){
	return this.comparison;
}

Parameter.prototype.setDataType=function(dataType){
	this.dataType = dataType;
}

Parameter.prototype.getDataType=function(){
	return this.dataType;
}

Parameter.prototype.setKey=function(key){
	this.key = key;
}

Parameter.prototype.getKey=function(){
	return this.key;
}

Parameter.prototype.setValue=function(value){
	this.value = value;
}

Parameter.prototype.getValue=function(){
	return this.value;
}

Parameter.prototype.setCriteria=function(criteria){
	this.criteria = criteria;
}

Parameter.prototype.getCriteria=function(){
	return this.criteria;
}
function Param(key,value,next){
	this.type='Param' ;
	this.key = key ;
	this.value = value ;
	this.nextParam = next ;
}
Param.prototype.setNextParam=function(param){
	this.nextParam = param ;
}
Param.prototype.getNextParam=function(){
	return this.nextParam ;
}
Param.prototype.setKey=function(key){
	this.key = key ;
}
Param.prototype.getKey=function(){
	return this.key ;
}
Param.prototype.setValue=function(value){
	this.value = value ;
}
Param.prototype.getValue=function(){
	return this.value ;
}
Param.prototype.hasNext=function(){
	if(this.nextParam){
		return true ;
	}
	return false ;
}
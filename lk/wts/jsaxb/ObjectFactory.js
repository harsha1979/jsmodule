function ObjectFactory(){
	this.type = "ObjectFactory";
}
ObjectFactory.prototype.createObject=function(objectType){
	var obj = eval("new "+objectType+"()");
	return  obj ;
}
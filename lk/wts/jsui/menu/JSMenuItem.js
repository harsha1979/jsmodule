function JSMenuItem(id,name){
	this.type='JSMenuItem';

	this.id = '' ;
	this.name = '' ;

	this.setID(id);
	this.setName(name);
}

JSMenuItem.prototype.setID=function(id){
	this.id = id ;
}
JSMenuItem.prototype.getID=function(){
	return this.id ;
}

JSMenuItem.prototype.setName=function(name){
	this.name = name ;
}
JSMenuItem.prototype.getName=function(){
	return this.name ;
}

function JSMenuItem(id,name,level){
	this.type='JSMenuItem';

	this.id = id || '' ;
	this.name = name || '' ;
	this.level = level || "default";

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

JSMenuItem.prototype.setLevel=function(level){
	this.level = level ;
}
JSMenuItem.prototype.getLevel=function(){
	return this.level ;
}

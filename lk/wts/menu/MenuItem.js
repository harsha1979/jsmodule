function MenuItem(id,name,menuItemOnClick){
	this.type='MenuItem';
	
	this.id = '' ;
	this.name = '' ;
	this.menuItemOnClick = menuItemOnClick ;
	this.setID(id);
	this.setName(name);
}

MenuItem.prototype.setID=function(id){
	this.id = id ;
}
MenuItem.prototype.getID=function(){
	return this.id ;
}

MenuItem.prototype.setName=function(name){
	this.name = name ;
}
MenuItem.prototype.getName=function(){
	return this.name ;
}

function Menu(menuName){
	this.type='Menu';
	this.menuName = menuName ;
	this.popupMenu = new PopupMenu();
	
}
Menu.prototype.init=function(){
	
}

Menu.prototype.add=function(item){
	this.popupMenu.add(item);
}
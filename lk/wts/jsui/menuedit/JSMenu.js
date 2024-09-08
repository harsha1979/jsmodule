function JSMenu(name,level,id){
	this.type='JSMenu';
	//wts.debug("JSMenu");
	this.JSPopupMenu(name,level,id);
}
JSMenu.prototype = new JSPopupMenu();
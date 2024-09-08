function JSMenu(name){
	this.type='JSMenu';
	//wts.debug("JSMenu");
	this.JSPopupMenu(name);
}
JSMenu.prototype = new JSPopupMenu();
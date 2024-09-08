PopupMenu.prototype = new Component();
function PopupMenu(){
	this.type='PopupMenu';
	this.items = new ArrayList() ;
	this.container = document.createElement('DIV');
	this.table = null ;
	this.show = false ;
	this.init();
}
PopupMenu.prototype.init=function(){
	this.table = this.getNewTable();
	this.container.appendChild(this.table);
	this.setContent(this.container);
}

PopupMenu.prototype.getNewTable=function(){
	var editor = document.createElement('TABLE');
	editor.style.backgroundColor ='red';
	return editor ;
}

PopupMenu.prototype.updateContent=function(){
	if(!this.table){
		this.table =this.getNewTable();
	}
 	var iterator =  this.items.iterator();
 	while (iterator.hasNext()) {
 		var item = iterator.next();
 		this.draw(item);
 	}
}

PopupMenu.prototype.draw=function(item){
	
	var row = this.table.insertRow();
	row.id = item.getID();
	row.item = item ;
	row.onmouseup = this.menuItemOnClick ;
	row.onmouseenter = this.menuItemOnMouseEnter ;
	row.onmouseleave= this.menuItemOnMouseLeave ;
	row.appendChild(item.getContent());
}


PopupMenu.prototype.menuItemOnClick=function(){
	if(event.button==1){
		alert(this.id +" , Object is :" + this.item);
	}
}
PopupMenu.prototype.menuItemOnMouseEnter=function(){
	this.style.backgroundColor ='blue';
}
PopupMenu.prototype.menuItemOnMouseLeave=function(){
	this.style.backgroundColor ='red';
}
PopupMenu.prototype.add=function(item){
	this.items.add(item);
	this.updateContent();
}
PopupMenu.prototype.drawPopup=function(left,top){
	document.body.appendChild(this.container);
	this.container.style.left = left ;
	this.container.style.top = top ;
	this.container.style.position = 'absolute';
	
	//this.holder.appendChild(this.container);
}
PopupMenu.prototype.clearPopup=function(){
	if(this.container){
		document.body.removeChild(this.container);
	}
}
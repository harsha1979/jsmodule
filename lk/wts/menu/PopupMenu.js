function PopupMenu(tableStyle,cellStyle,cellMouseOverStyle,menucellheader, reference){
	this.type='PopupMenu';
	
	this.cellStyle = cellStyle;
	this.cellMouseOverStyle = cellMouseOverStyle;
	this.tableStyle = tableStyle;
	this.menucellheader = menucellheader 
	
	//this.holder = null ;
	this.reference = reference ;
	
	this.parentContainer = null ;
	this.items = new ArrayList() ;
	this.container = document.createElement('DIV');
	this.container.oncontextmenu=function(){return false;};
	this.table = null ;
	this.show = false ;
	
	this.table = this.getNewTable();
	this.container.appendChild(this.table);
	//this.container.style.visibility = 'hidden' ;
	//document.body.appendChild(this.container);
}

PopupMenu.prototype.controllerBind=function(holder,onclickevent){
	
	this.holder = holder ;
	this.holder.oncontextmenu=function(){return false;};
	this.holder.reference = this; 
	this.holder.onmouseup = this.register ;
	if(onclickevent){
		for(var index=1; index<this.table.cells.length; index++) {
			this.table.cells[index].onclick = this.onclickhandler ;
			this.table.cells[index].userevent = onclickevent ;
			this.table.cells[index].base = this.holder ;
			//this.table.cells[index].reference = this.reference ;
		}
	}
}
PopupMenu.prototype.onclickhandler=function(){
	this.reference.clearPopup();
	this.userevent(this.base,this.reference.reference);
}

PopupMenu.prototype.register=function(){
	window.event.cancelBubble = true;
	if(event.button==2){
		//this.reference.clearPopup();
		var x = event.x;
		var y =event.y;
		if(document.body.offsetWidth-185<event.x){
			x=document.body.offsetWidth-185;
		}
		if(document.body.offsetHeight-(20*this.reference.table.rows.length)-20<event.y){
			y=document.body.offsetHeight-(20*this.reference.table.rows.length)-20;
		}
		this.reference.drawPopup(x,y);
		this.reference.show = true ;
	}
	if(event.button==1 && this.reference.show){
		this.reference.clearPopup();
		this.reference.show = false ;
	}
}

PopupMenu.prototype.view=function(base,reference){
		this.reference.clearPopup();
		var x = findPosX(base);
		var y = findPosY(base);
		if(document.body.offsetWidth-185<x){
			x=document.body.offsetWidth-185;
		}
		if(document.body.offsetHeight-(20*this.reference.table.rows.length)-20<y){
			y=document.body.offsetHeight-(20*this.reference.table.rows.length)-20;
		}
		this.drawPopup(x,y);
		this.show = true ;
}

/*PopupMenu.prototype.setCellStyle=function(cellStyle){
	this.cellStyle = cellStyle;
}
PopupMenu.prototype.setTableStyle=function(tableStyle){
	this.tableStyle = tableStyle;
}
PopupMenu.prototype.setCellMouseOverStyle=function(cellMouseOverStyle){
	this.cellMouseOverStyle = cellMouseOverStyle;
}*/

PopupMenu.prototype.setParentContainer=function(parentContainer){
	this.parentContainer = parentContainer ;
}
PopupMenu.prototype.getParentContainer=function(){
	return this.parentContainer ;
}


PopupMenu.prototype.getNewTable=function(){
	var editor = document.createElement('TABLE');
	editor.className = this.tableStyle ;
	var row = editor.insertRow();
	var cell = row.insertCell();
	cell.UNSELECTABLE ='on';
	cell.innerHTML = "Dynamic Component";
	
	cell.className = this.menucellheader;
	return editor ;
}


PopupMenu.prototype.draw=function(item){
	if(!this.table){
		this.table =this.getNewTable();
	}
	var row = this.table.insertRow();
	row.id = item.getID();
	row.item = item ;
	
	var cell = row.insertCell();
	cell.UNSELECTABLE ='on';
	if(item.type=='MenuItemSeperator'){
		cell.innerHTML = '<hr />';
		cell.height = '2px';
	}else{
		cell.innerText = item.getName();
		cell.id = item.getID();
		cell.itemname = item.getName();
		
		if(item.menuItemOnClick){
			cell.onclick = item.onclickhandler ;
			cell.userevent = this.menuItemOnClick ;
		}
		cell.onmouseenter = this.menuItemOnMouseEnter ;
		cell.onmouseleave= this.menuItemOnMouseLeave ;
		cell.reference = this ;
		cell.className = this.cellStyle ;
	}
}


PopupMenu.prototype.menuItemOnMouseEnter=function(){
	this.className = this.reference.cellMouseOverStyle ;
}
PopupMenu.prototype.menuItemOnMouseLeave=function(){
	this.className = this.reference.cellStyle ;
}
PopupMenu.prototype.add=function(item){
	this.items.add(item);
	this.draw(item);
}
PopupMenu.prototype.drawPopup=function(left,top){
	document.body.appendChild(this.container);
	//this.container.style.visibility='visible';
	this.container.style.left = left ;
	this.container.style.top = top ;
	this.container.style.position = 'absolute';
	
	//this.holder.appendChild(this.container);
}
PopupMenu.prototype.clearPopup=function(){
	if(this.container){
		try{
			//this.table.className = this.tableStyle ;
			for(var index=1; index<this.table.cells.length; index++) {
				this.table.cells[index].className = this.cellStyle ;
			}
			//alert(this.holder.onmouseup);
			this.holder.onmouseup = null ;
			this.container.removeNode(true);
			//this.container.style.visibility='hidden';
			this.reference.show = false ;
		}catch(exx){}
	}
}
function findPosX(obj){
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			curleft -= obj.scrollLeft;
			obj = obj.offsetParent;
		}
	}else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj){
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			curtop -= obj.scrollTop;
			obj = obj.offsetParent;		
		}
		
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}
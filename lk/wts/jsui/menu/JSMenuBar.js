wts.using("lk.wts.comm.Common;");
wts.using("lk.wts.util.*;");

wts.using("lk.wts.jsui.menu.JSMenuItem;");
wts.using("lk.wts.jsui.menu.JSPopupMenu;");
wts.using("lk.wts.jsui.menu.JSMenu;");





function JSMenuBar(){
	this.type='JSMenuBar';
	this.container = null ;
	this.menus = new HashMap();
	this.currentMenuOnSelect = null ;
	this.currentMenuOnMouseOver = null ;
	this.menuBarView = null ;

	/*document.body.attachEvent('onclick',this.bodyOnClick);
	document.body.menuBar = this ;*/
}

JSMenuBar.menuBarStyle = 'menuBar';
JSMenuBar.menuBarOnMouseOverStyle = 'menuBarOnMouseOver';
JSMenuBar.menuBarStyleOnSelect = 'menuBarOnSelect';
JSMenuBar.menuItemStyle = 'menuItem';
JSMenuBar.menuItemStyleOnSelect = 'menuItemOnSelect';

JSMenuBar.menuBarContainerStyle = 'menuBarContainer';
JSMenuBar.menuItemsContainerStyle = 'menuItemContainer';

JSMenuBar.clickEventOnMenuItem = null ;

JSMenuBar.prototype.bodyOnClick=function(){
	//evt.srcElement.menuBar.clearMenu();
}


JSMenuBar.prototype.addMenu=function(menu){
	this.menus.put(menu.getName(),menu);
	menu.parentPopup = this ;
}
JSMenuBar.prototype.loadMenuBar=function(container){
	this.container = container ;
	
	this.menuBarView = document.createElement("table");
	this.menuBarView.width = "100%" ;
	this.menuBarView.height = 15 ;
	
	this.menuBarView.className = JSMenuBar.menuBarContainerStyle ;
	
	var row = this.menuBarView.insertRow(-1);
	
	var iterator = this.menus.entrySet();
	while (iterator.hasNext()) {
		var name = iterator.next();
		var item = this.menus.get(name);
		var cell = row.insertCell(-1);
		cell.UNSELECTABLE = 'on';
		cell.innerHTML = name ;
		cell.item = item ;
		cell.menuBar = this ;
		cell.className = JSMenuBar.menuBarStyle;
		item.cell = cell ;
		
		wts.attachedEventCBrowser(cell,"onclick",this.onClickOnMenu,false);
		wts.attachedEventCBrowser(cell,"onmouseover",this.onMouseOverOnMenu,false);
		wts.attachedEventCBrowser(cell,"onmouseout",this.onMouseOutOnMenu,false);
		//cell.onclick = this.onClickOnMenu ;
		//cell.onmouseover = this.onMouseOverOnMenu ;
		//cell.onmouseout = this.onMouseOutOnMenu ;
	}
	var cellEnd = row.insertCell(-1);
	cellEnd.width = "100%" ;
	
	this.container.appendChild(this.menuBarView);
}
JSMenuBar.prototype.onMouseOverOnMenu=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	if(this.menuBar.currentMenuOnSelect){
		this.menuBar.clearMenu(this.menuBar.currentMenuOnSelect.item);
		this.menuBar.currentMenuOnSelect = evt.srcElement ;
		this.menuBar.currentMenuOnSelect.className = JSMenuBar.menuBarStyleOnSelect;
		if(this.item && this.item.type=='JSMenu'){
			this.item.popup(evt.srcElement,"left","bottom");
		}
	}else{
		if(this.menuBar.currentMenuOnMouseOver){
			this.menuBar.currentMenuOnMouseOver.className = JSMenuBar.menuBarStyle ;
		}
		this.menuBar.currentMenuOnMouseOver = evt.srcElement ;
		this.menuBar.currentMenuOnMouseOver.className = JSMenuBar.menuBarOnMouseOverStyle ;
	}
	
}
JSMenuBar.prototype.onMouseOutOnMenu=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	if(this.menuBar.currentMenuOnMouseOver){
		this.menuBar.currentMenuOnMouseOver.className = JSMenuBar.menuBarStyle ;
		this.menuBar.currentMenuOnMouseOver=null;
	}
}
JSMenuBar.prototype.onClickOnMenu=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	if(this.menuBar.currentMenuOnSelect && this.menuBar.currentMenuOnSelect.item.isPopup && this.menuBar.currentMenuOnSelect.sourceIndex==evt.srcElement.sourceIndex){
		this.menuBar.clearMenu(this.menuBar.currentMenuOnSelect.item);
		return null ;
	}
	if(this.menuBar.currentMenuOnSelect){
		this.menuBar.clearMenu(this.menuBar.currentMenuOnSelect.item);
	}
	this.menuBar.currentMenuOnSelect = evt.srcElement ;
	this.menuBar.currentMenuOnSelect.className = JSMenuBar.menuBarStyleOnSelect;
	if(this.item && this.item.type=='JSMenu'){
		this.item.popup(evt.srcElement,"left","bottom");
	}
}
JSMenuBar.prototype.clearMenu=function(menu){
	if(menu){
		menu.cell.className = JSMenuBar.menuBarStyle ;
		menu.remove(true);
		this.currentMenuOnSelect = null ;
	}
}

/*
 * JSMenuBar.prototype.onClickOnMenu=function(){
	var x = this.menuBar.currentMenuOnSelect ;
	
	this.menuBar.currentMenuOnSelect = evt.srcElement ;
	if(this.item && this.item.type=='JSPopupMenu'){
		this.item.popup(evt.srcElement,"left","bottom");
	}
	this.menuBar.clearMenu(x);
}
JSMenuBar.prototype.clearMenu=function(x){
	if(x){
		x.item.remove(true);
	}
}
	*/
	
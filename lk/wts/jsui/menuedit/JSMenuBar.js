wts.using("lk.wts.comm.Common;");
wts.using("lk.wts.util.*;");

wts.using("lk.wts.jsui.menuedit.JSMenuItem;");
wts.using("lk.wts.jsui.menuedit.JSPopupMenu;");
wts.using("lk.wts.jsui.menuedit.JSMenu;");





function JSMenuBar(isEditMode){
	this.type='JSMenuBar';
	this.container = null ;
	this.menus = new HashMap();
	this.currentMenuOnSelect = null ;
	this.currentMenuOnMouseOver = null ;
	this.menuBarView = null ;
	
	JSMenuBar.isEditMode = isEditMode || false ;

	/*document.body.attachEvent('onclick',this.bodyOnClick);
	document.body.menuBar = this ;*/
}

JSMenuBar.menuBarStyle = 'menuBar';
JSMenuBar.menuBarOnMouseOverStyle = 'menuBarOnMouseOver';
JSMenuBar.menuBarStyleOnSelect = 'menuBarOnSelect';
JSMenuBar.menuItemStyle = 'menuItem';
JSMenuBar.menuItemDenyStyle = 'menuItemDeny';

JSMenuBar.menuItemStyleOnSelect = 'menuItemOnSelect';

JSMenuBar.menuBarContainerStyle = 'menuBarContainer';
JSMenuBar.menuItemsContainerStyle = 'menuItemContainer';

JSMenuBar.clickEventOnMenuItem = null ;

JSMenuBar.editingItem = null ;

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
		
		
		
		if(JSMenuBar.isEditMode==false){
			wts.attachedEventCBrowser(cell,"onmouseover",this.onMouseOverOnMenu,false);
			wts.attachedEventCBrowser(cell,"onmouseout",this.onMouseOutOnMenu,false);
		}else{
			wts.attachedEventCBrowser(cell,"ondblclick",this.menuDBClick,false);
		}
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

JSMenuBar.getLevelSelect=function(selectedLevel){
	
	var levels = new Array("allow","deny");
	var levelSelecter = document.createElement("select");
	for(var index=0; index<levels.length; index++) {
		var opt = document.createElement("option");
		opt.text=levels[index];
		opt.value=levels[index];
		levelSelecter.options.add(opt);
		if(levels[index]==selectedLevel){
			opt.selected = index ;
		}
	}
	return levelSelecter ;
}

JSMenuBar.prototype.menuDBClick=function(evt){
	
	if(this.menuBar.currentMenuOnSelect && this.menuBar.currentMenuOnSelect.item.isPopup && this.menuBar.currentMenuOnSelect.sourceIndex==evt.srcElement.sourceIndex){
		this.menuBar.clearMenu(this.menuBar.currentMenuOnSelect.item);
		return null ;
	}
	if(this.menuBar.currentMenuOnSelect){
		this.menuBar.clearMenu(this.menuBar.currentMenuOnSelect.item);
	}
		
	JSMenuBar.restoreEditingItem();
	
	var level  = evt.srcElement.item.getLevel();
	
	wts.debug(",,,,,,,,,,,,,DB Clicked On menu Item");
	
	var se = JSMenuBar.getLevelSelect(level);
	evt.srcElement.insertAdjacentElement("afterBegin",se);
	
	se.item = evt.srcElement.item ;
	wts.attachedEventCBrowser(se,"onchange",JSMenuBar.onLevelSelectChange,false);
	
	JSMenuBar.editingItem = se ;
	
}

JSMenuBar.onLevelSelectChange=function(evt){
	wts.debug(evt.srcElement.options[evt.srcElement.selectedIndex].value);
	evt.srcElement.item.setLevel(evt.srcElement.options[evt.srcElement.selectedIndex].value);
}
JSMenuBar.restoreEditingItem=function(evt){
	if(JSMenuBar.editingItem!=null){
		JSMenuBar.editingItem.parentNode.removeChild(JSMenuBar.editingItem);
	}
}
JSMenuBar.prototype.setMenus=function(menus){
	this.menus = menus ;
}
JSMenuBar.prototype.getMenus=function(){
	return this.menus ;
}

/*

*/
	
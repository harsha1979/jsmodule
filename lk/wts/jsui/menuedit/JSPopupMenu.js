function JSPopupMenu(name,level,id){
	this.type='JSPopupMenu';
	//wts.debug('JSPopupMenu');
	this.JSPopupMenu(name,level,id);
}

JSPopupMenu.prototype.JSPopupMenu=function(name,level,id){
	this.container = null ;
	this.name = name;
	this.id = id ;
	this.items = new HashMap();
	this.currentItem = null ;
	this.poupMenuView = null;
	this.isPopup = false ;
	this.parentPopup = null ;
	this.frm = document.createElement("IFRAME");
	this.toolTipIntervalId = null ;
	
	this.level = level || "allow";
}

JSPopupMenu.prototype.addItem=function(item){
	this.items.put(item.getName(),item);
	item.parentPopup = this ;
}

JSPopupMenu.prototype.getItems=function(){
	return this.items;
}
JSPopupMenu.prototype.setItems=function(items){
	this.items = items ; 
}


JSPopupMenu.prototype.popup=function(container,alignX,alignY,xShift,yShift){
	
	if(container.item && container.item.getLevel()=="deny"){
		return ;
	}
	
	if(this.isPopup){
		this.remove(true);
		return null ;
	}
	this.isPopup = true ;
	
	this.poupMenuView = document.createElement("table");
	this.poupMenuView.style.zIndex=1500;
	this.poupMenuView.className = JSMenuBar.menuItemsContainerStyle;
	
	
	var iterator = this.items.entrySet();
	while (iterator.hasNext()) {
		var name = iterator.next();
		var item = this.items.get(name);
		var aRow = this.poupMenuView.insertRow(-1);
		var aCell = aRow.insertCell(-1);
		aCell.UNSELECTABLE = 'on';
		if(name=='menu_sp'){
			aCell.innerHTML = "<hr/>" ;
			continue ;
		}
		aCell.innerHTML = name + "&nbsp;&nbsp;";
		aCell.item = item ;
		aCell.container = this ;
		
		
		
		wts.attachedEventCBrowser(aCell,"onmouseover",this.itemMouseOver,false);
		wts.attachedEventCBrowser(aCell,"onmouseout",this.itemMouseOut,false);
		wts.attachedEventCBrowser(aCell,"onfocusout",this.itemOnFocusOut,false);
		
		if(item.getLevel()=="deny"){
			aCell.className=JSMenuBar.menuItemDenyStyle; 
		}else{
			aCell.className=JSMenuBar.menuItemStyle;
		}
		
		if(JSMenuBar.isEditMode==false){
			if(item.getLevel()!="deny"){
				wts.attachedEventCBrowser(aCell,"onclick",this.menuItemClick,false);
			}
		}else{
			wts.attachedEventCBrowser(aCell,"ondblclick",this.menuItemDBClick,false);
		}
		
		
		//aCell.onmouseover = this.itemMouseOver ;
		//aCell.onmouseout = this.itemMouseOut ;
		//aCell.onfocusout = this.itemOnFocusOut ;
		
		//aCell.onclick = this.menuItemClick ;
		
		//wts.debug(item.type);
		if(item.type!='JSMenuItem'){
			//var bCell = aRow.insertCell(-1);
			var im = baseURL+"images/menu/s.gif" ;
			aCell.style.backgroundImage = 'url('+im+')' ;
			aCell.style.backgroundRepeat = 'no-repeat';
			aCell.style.backgroundPosition = 'right';
		}
		
		
	}
	/*if(wts.isIE){
		this.poupMenuView.style.visibility="hidden";
		this.poupMenuView.style.filter="progid:DXImageTransform.Microsoft.Wipe( GradientSize=0.3, wipeStyle=1, motion='forward')"; 
	}*/
	
	
	//this.poupMenuView.style.filter="progid:DXImageTransform.Microsoft.RandomBars(orientation='horizontal')"; 
	//this.poupMenuView.style.filter="progid:DXImageTransform.Microsoft.RandomDissolve()"; 
	document.body.appendChild(this.poupMenuView);
	this.positioning(container,alignX,alignY,xShift,yShift);
	
	/*if(wts.isIE){
		this.poupMenuView.filters[0].Apply();
		this.poupMenuView.style.visibility="visible";
		this.poupMenuView.filters[0].Play(duration=0.3);
	}*/
}


JSPopupMenu.prototype.menuItemClick=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	
	if(evt.srcElement.item.type=='JSMenuItem'){
		wts.debug("Clicked On menu Item");
		this.container.removeUp(evt.srcElement.item.parentPopup);
		
		if(JSMenuBar.clickEventOnMenuItem){
			JSMenuBar.clickEventOnMenuItem(evt.srcElement.item);
		}
	}
	
}
JSPopupMenu.prototype.menuItemDBClick=function(evt){
	
	JSMenuBar.restoreEditingItem();
	
	var level  = evt.srcElement.item.getLevel();
	
	wts.debug("DB Clicked On menu Item");
	
	var se = JSMenuBar.getLevelSelect(level);
	evt.srcElement.insertAdjacentElement("afterBegin",se);
	
	se.item = evt.srcElement.item ;
	wts.attachedEventCBrowser(se,"onchange",JSMenuBar.onLevelSelectChange,false);
	
	JSMenuBar.editingItem = se ;
	
}

/*
JSPopupMenu.prototype.onLevelSelectChange=function(evt){
	wts.debug(evt.srcElement.options[evt.srcElement.selectedIndex].value);
	evt.srcElement.item.setLevel(evt.srcElement.options[evt.srcElement.selectedIndex].value);
}
JSPopupMenu.prototype.restoreEditingItem=function(evt){
	if(JSMenuBar.editingItem!=null){
		JSMenuBar.editingItem.parentNode.removeChild(JSMenuBar.editingItem);
	}
}
*/

JSPopupMenu.prototype.itemOnFocusOut=function(evt){
	//wts.debug(evt.srcElement);
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
}

JSPopupMenu.prototype.itemMouseOut=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	/*window.clearInterval(this.container.toolTipIntervalId);
	if(this.container.toolTip){
		this.container.toolTip.hide();
	}*/

	
}
JSPopupMenu.prototype.itemMouseOver=function(evt){
	/*if(!evt.srcElement){
		evt.srcElement = evt.target ;
	}*/
	
	this.container.setItemDefaultStyle();
	if(this.container.currentItem){
		this.container.clearPopupMenus(this.container);
	}
	
	this.container.currentItem = evt.srcElement ;
	
	this.container.setItemMouseOverStyle();
	
	
	if(this.container.item && this.container.item.getLevel()=="deny"){
		evt.srcElement.className=JSMenuBar.menuItemDenyStyle; 
	}else if(evt.srcElement.item.getLevel()=="deny"){
		evt.srcElement.className=JSMenuBar.menuItemDenyStyle; 
	}else{
		evt.srcElement.className=JSMenuBar.menuItemStyle;
	}

	//wts.debug("Item Name :");

	if(this.item.type=='JSPopupMenu' || this.item.type=='JSMenu'){
		this.item.popup(this,"right","top",-2,-2);
	}
	/*var htmlCode ='<table style="font-size:11px;font-family: Verdana, Arial, Helvetica, sans-serif;background-color:#CCCCCC;color:#000000;border-width:1px;border-style:inset;border-color:black">';
	htmlCode+='  <tr>';
	htmlCode+='    <td><p><strong>Test</strong></p></td>';
	htmlCode+='  </tr> ';
	htmlCode+='</table>';*/
	
	//this.container.toolTipIntervalId = window.setInterval(,2000);
	//this.container.toolTipIntervalId = window.setInterval("alert('"+htmlCode+"');",2000);
	
}
JSPopupMenu.prototype.setItemMouseOverStyle=function(){
	if(this.currentItem.item.getLevel()!="deny"){
		this.currentItem.className=JSMenuBar.menuItemStyleOnSelect;
	}else{
		this.currentItem.className=JSMenuBar.menuItemDenyStyle;
	}
}

JSPopupMenu.prototype.setItemDefaultStyle=function(){
	if(this.currentItem){
		if(this.currentItem.item.getLevel()!="deny"){
			this.currentItem.className=JSMenuBar.menuItemStyle;
		}else{
			this.currentItem.className=JSMenuBar.menuItemDenyStyle;
		}
		
	}
}

JSPopupMenu.prototype.clearPopupMenus=function(popup){
	var pItems = popup.getItems();
	if(pItems){
		var iterator = pItems.entrySet();
		while (iterator.hasNext()) {
			var name = iterator.next();
			//wts.debug("Clear Items Name :"+name);
			var item = pItems.get(name);
			if((item.type=='JSPopupMenu' || item.type=='JSMenu') && item.isPopup ){
				item.isPopup = false ;
				item.remove();
				this.clearPopupMenus(item);
			}
		}
	}
}
JSPopupMenu.prototype.remove=function(isChildNodes){
	if(isChildNodes && this.poupMenuView){
		this.isPopup = false ;
		//this.poupMenuView.style.filter="progid:DXImageTransform.Microsoft.Wipe( GradientSize=0.01, wipeStyle=1, motion='reverse')"; 
		/*this.poupMenuView.style.filter="progid:DXImageTransform.Microsoft.RandomBars(orientation='horizontal')"; 
		this.poupMenuView.filters[0].Apply();
		this.poupMenuView.style.visibility="hidden";
		this.poupMenuView.filters[0].Play(duration=0.2);*/
		//this.poupMenuView.removeNode(true);
		this.poupMenuView.parentNode.removeChild(this.poupMenuView);
		if(wts.isIE){
			try{
				this.frm.parentNode.removeChild(this.frm);
			}catch(exx){}
		}
		this.clearPopupMenus(this);
	}else{
		if(this.poupMenuView){
			this.isPopup = false ;
			//this.poupMenuView.removeNode(true);
			this.poupMenuView.parentNode.removeChild(this.poupMenuView);
			if(wts.isIE){
				try{
					this.frm.parentNode.removeChild(this.frm);
				}catch(exx){}
			}
		}
	}
}
JSPopupMenu.prototype.removeUp=function(popup){
	if(popup.parentPopup){
		if(popup.parentPopup.type =="JSPopupMenu" || popup.parentPopup.type =="JSMenu"){
			popup.removeUp(popup.parentPopup);
		}else if(popup.parentPopup.type =="JSMenuBar"){
			popup.parentPopup.clearMenu(popup);
		}
	}
}
JSPopupMenu.prototype.positioning=function(container,alignX,alignY,xShift,yShift){
	
	var left = -4;
	var top = 3 ;

	if(alignX && alignX=='right'){
		left = container.offsetWidth;
	}
	if(alignY && alignY=='bottom'){
		top = container.offsetHeight ;
	}
	if(xShift){
		left+=eval(xShift) ;
	}
	if(yShift){
		top+=eval(yShift) ;
	}
	
	this.poupMenuView.style.left = left + Common.findPosX( container ) ;
	this.poupMenuView.style.top = top + Common.findPosY( container ) ;
	this.poupMenuView.style.position = 'absolute';
	
	if(wts.isIE){
		document.body.appendChild(this.frm);
		this.frm.style.position = 'absolute';
		this.frm.style.left = this.poupMenuView.style.left;
		this.frm.style.top = this.poupMenuView.style.top;
		this.frm.style.width = this.poupMenuView.offsetWidth;
		this.frm.style.height = this.poupMenuView.offsetHeight;
		this.frm.frameBorder='no';
	}
	
}

JSPopupMenu.prototype.setName=function(name){
	this.name = name ;
}
JSPopupMenu.prototype.getName=function(){
	return this.name ;
}

JSPopupMenu.prototype.setLevel=function(level){
	this.level = level ;
}
JSPopupMenu.prototype.getLevel=function(){
	return this.level ;
}

JSPopupMenu.prototype.setID=function(id){
	this.id = id ;
}
JSPopupMenu.prototype.getID=function(){
	return this.id ;
}
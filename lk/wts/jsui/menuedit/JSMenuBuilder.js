wts.using("lk.wts.util.*;");
wts.using("lk.wts.comm.Common;");
wts.using("lk.wts.jsui.component.ToolTip;");

wts.using("lk.wts.jsui.menuedit.JSMenuItem;");
wts.using("lk.wts.jsui.menuedit.JSPopupMenu;");

wts.using("lk.wts.jsui.menuedit.JSMenu;");
wts.using("lk.wts.jsui.menuedit.JSMenuBar;");




function JSMenuBuilder(){
	this.type="JSMenuBuilder";
}
JSMenuBuilder.buildMenuBar=function(menuXML,isEditMode){
	var dom = Common.loadDOM(menuXML);
	var menuBarNode = dom.getElementsByTagName("MenuBar") ;
	if(menuBarNode && menuBarNode.length > 0){
		var menuBar = new JSMenuBar(isEditMode);
		var menusNodes = menuBarNode[0].childNodes ;
		if(menusNodes){
			for(var index=0; index<menusNodes.length; index++) {
				var menuNode = menusNodes[index];
				if(menuNode.nodeName!='#text'){
					
					var menu = build(menuNode);
					if(menu){
						menuBar.addMenu(menu);
					}
				}
			}
		}
	}
	function build(menuNode){
		
		var menu = new JSMenu();
		try{
			menu.setName(menuNode.getAttribute("name"));
			menu.setLevel(menuNode.getAttribute("level"));
			menu.setID(menuNode.getAttribute("id"));
			
		}catch(exx){
			
		}
		
		var menuItemNodes = menuNode.childNodes;
		if(menuItemNodes){
			for(var index=0; index<menuItemNodes.length; index++) {
				var menuItemNode = menuItemNodes[index];
				var menuItem = new JSMenuItem();
				if(menuItemNode.nodeName=='Menu'){
					menuItem = build(menuItemNode);
				}else{
					try{
						menuItem.setName(menuItemNode.getAttribute("name"));
						menuItem.setLevel(menuItemNode.getAttribute("level"));
						menuItem.setID(menuItemNode.getAttribute("id"));
						
					}catch(exx){
						continue ;
					}
				}
				menu.addItem(menuItem);
			}
		}
		return menu;
	}
	return menuBar ;
}
JSMenuBuilder.getMenuXML=function(menuBar){
	d
	JSMenuBuilder.menuXML = "<MenuBar>" ;
	var menus = menuBar.getMenus();
	var menuIter =  menus.entrySet();
	while(menuIter.hasNext()){
		var menuName = menuIter.next();
		var menu = menus.get(menuName);
		JSMenuBuilder.menuXML += buildXML(menu);
	}
	
	JSMenuBuilder.menuXML += "</MenuBar>" ;
	
	function buildXML(menu){
		
		var xml ='<Menu name="'+menu.getName()+'" ';
		
		if(menu.getID() && menu.getID()!=""){
			xml +=' id="'+menu.getID()+'" ' ;
		}
		
		if(menu.getLevel() && menu.getLevel()!=""){
			xml +=' level="'+menu.getLevel()+'" ';
		}
		xml +=' >';
		
		var items = menu.getItems();
		var itemIter =  items.entrySet();
		while(itemIter.hasNext()){
			var itemName = itemIter.next();
			var item = items.get(itemName);
			if(item.type=='JSMenu'){
				xml += buildXML(item);
			}else{
				xml +='<MenuItem name="'+item.getName()+'" ';
				if(item.getID() && item.getID()!=""){
					xml +=' id="'+item.getID()+'" ' ;
				}
				if(item.getLevel() && item.getLevel()!=""){
					xml +=' level="'+item.getLevel()+'" ';
				}
				xml +=' />';
				
			}
		}
		xml +='</Menu>'
		return xml ;
	}
	return JSMenuBuilder.menuXML ;	
}


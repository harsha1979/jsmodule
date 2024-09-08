wts.using("lk.wts.util.*;");
wts.using("lk.wts.comm.Common;");
wts.using("lk.wts.jsui.component.ToolTip;");

wts.using("lk.wts.jsui.menu.JSMenuItem;");
wts.using("lk.wts.jsui.menu.JSPopupMenu;");

wts.using("lk.wts.jsui.menu.JSMenu;");
wts.using("lk.wts.jsui.menu.JSMenuBar;");




function JSMenuBuilder(){
	this.type="JSMenuBuilder";
}
JSMenuBuilder.buildMenuBar=function(menuXML){
	var dom = Common.loadDOM(menuXML);
	var menuBarNode = dom.getElementsByTagName("MenuBar") ;
	if(menuBarNode && menuBarNode.length > 0){
		var menuBar = new JSMenuBar();
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

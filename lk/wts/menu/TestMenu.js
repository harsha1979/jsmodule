function test(){
	
	var pop = new PopupMenu(document,'menutable','menucell','menucellover','menucellheader');
	pop.add(new MenuItem("a1","Handle Value",onItemClick));
	pop.add(new MenuItem("a2","CLear",onItemClick));
	pop.add(new MenuItemSeperator());
	pop.add(new MenuItem("a3","Help",onItemClick));
	pop.add(new MenuItem("a111","Handle Value",onItemClick));
	pop.add(new MenuItem("a222","CLear",onItemClick));
	pop.add(new MenuItemSeperator());
	pop.add(new MenuItem("a333","Help",onItemClick));
	pop.add(new MenuItem("a144","Handle Value",onItemClick));
	pop.add(new MenuItem("a255","CLear",onItemClick));
	pop.add(new MenuItemSeperator());
	pop.add(new MenuItem("a366","Help",onItemClick));

}

function onItemClick(){
	//alert(this.itemname);
}

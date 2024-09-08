function DataSelectComponent(parentcomp,componentid,sourceName,destName,isMove,url){
	//alert(dd.dd);
	
	this.componenthtml="<table id='"+componentid+"'>";
	
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td>"+sourceName+"</td>";
	this.componenthtml+="		<td></td>";
	this.componenthtml+="		<td>"+destName+"</td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td rowspan='4'><select multiple='true' style='height: 150px;width: 150px;' id='"+componentid+"_dscomp_sourcesel'></select></td>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_addone' src='"+url+"/images/select/addone.jpg'></td>";
	this.componenthtml+="		<td rowspan='4'><select multiple='true' style='height: 150px;width: 150px;' id='"+componentid+"_dscomp_destsel'></select></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_remone' src='"+url+"/images/select/remone.jpg'></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_addall' src='"+url+"/images/select/addall.jpg'></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_remall' src='"+url+"/images/select/remall.jpg'></td>";
	this.componenthtml+="	</tr>";
	
	this.componenthtml+="</table>";
	
	this.parentcomp = parentcomp ;
	this.isMove = isMove ;
	
	this.parentcomp.innerHTML = this.componenthtml ;
	
	this.mainTable = document.getElementById(componentid);
	this.mainTable.dataSelectComponent = this ;
	
	this.selectSource = document.getElementById(componentid+'_dscomp_sourcesel');
	this.selectSource.parentComponent = this ;
	this.selectDest = document.getElementById(componentid+'_dscomp_destsel');
	this.selectDest.parentComponent = this ;
	this.btnAddOne = document.getElementById(componentid+'_dscomp_addone');
	this.btnAddOne.parentComponent = this ;
	this.btnRemOne = document.getElementById(componentid+'_dscomp_remone');
	this.btnRemOne.parentComponent = this ;
	this.btnAddAll = document.getElementById(componentid+'_dscomp_addall');
	this.btnAddAll.parentComponent = this ;
	this.btnRemAll = document.getElementById(componentid+'_dscomp_remall');
	this.btnRemAll.parentComponent = this ;
	
	
	this.selectSource.ondblclick = this.sourceDBClick ;
	this.selectDest.ondblclick = this.destDBClick ;
	this.btnAddOne.onclick = this.sourceToDestOne;
	this.btnRemOne.onclick = this.destToSourceOne;
	this.btnAddAll.onclick = this.sourceToDestAll;
	this.btnRemAll.onclick = this.destToSourceAll;
}

DataSelectComponent.prototype.sourceDBClick=function(){
	//alert(dd.dd);
	var index = this.parentComponent.selectSource.selectedIndex ;
	var option = this.parentComponent.selectSource.options.item(index);
	option.selected = false ;
	this.parentComponent.selectSource.options.remove(index);
	this.parentComponent.selectDest.options.add(option);
}

DataSelectComponent.prototype.destDBClick=function(){
	var index = this.parentComponent.selectDest.selectedIndex ;
	var option = this.parentComponent.selectDest.options.item(index);
	option.selected = false ;
	this.parentComponent.selectDest.options.remove(index);
	this.parentComponent.selectSource.options.add(option);
}


DataSelectComponent.prototype.sourceToDestOne=function(){
	//alert(dd.dd);
	for(var index=0; index<this.parentComponent.selectSource.options.length; index++) {
		var option = this.parentComponent.selectSource.options.item(index);
		if(option.selected){
			option.selected = false ;
			this.parentComponent.selectSource.options.remove(index);
			this.parentComponent.selectDest.options.add(option);
			index--;
		}
	}
}


DataSelectComponent.prototype.destToSourceOne=function(){
	for(var index=0; index<this.parentComponent.selectDest.options.length; index++) {
		var option = this.parentComponent.selectDest.options.item(index);
		if(option.selected){
			option.selected = false ;
			this.parentComponent.selectDest.options.remove(index);
			this.parentComponent.selectSource.options.add(option);
			index--;
		}
	}
}

DataSelectComponent.prototype.sourceToDestAll=function(){
	for(var index=0; index<this.parentComponent.selectSource.options.length; index++) {
		var option = this.parentComponent.selectSource.options.item(index);
		option.selected = false ;
		this.parentComponent.selectSource.options.remove(index);
		this.parentComponent.selectDest.options.add(option);
		index--;
	}
}


DataSelectComponent.prototype.destToSourceAll=function(){
	for(var index=0; index<this.parentComponent.selectDest.options.length; index++) {
		var option = this.parentComponent.selectDest.options.item(index);
		option.selected = false ;
		this.parentComponent.selectDest.options.remove(index);
		this.parentComponent.selectSource.options.add(option);
		index--;
	}
}


DataSelectComponent.prototype.addToSource=function(value,text){
	var option = document.createElement("option");
	option.value = value ;
	option.text = text ;
	this.selectSource.options.add(option);
}

DataSelectComponent.prototype.removeFromSource=function(value){
	for(var index=0; index<this.selectSource.options.length; index++) {
 		var opt = this.selectSource.options[index];
 		if(opt.value==value){
 			this.selectSource.options.remove(index);
 			break ;
 		}
	}
}


DataSelectComponent.prototype.addToDestination=function(value,text){
	var option = document.createElement("option");
	option.value = value ;
	option.text = text ;
	this.selectDest.options.add(option);
}

DataSelectComponent.prototype.removeFromDestination=function(value){
	for(var index=0; index<this.selectDest.options.length; index++) {
 		var opt = this.selectDest.options[index];
 		if(opt.value==value){
 			this.selectDest.options.remove(index);
 			break ;
 		}
	}
}

DataSelectComponent.prototype.setToSource=function(coll){
	
 	var keys = coll.getKeySet();
 	for(var index=0; index<coll.size(); index++) {
 		var key = keys[index];
  		var text = coll.get(key);
 		var option = document.createElement("option");
		option.value = key ;
		option.text = text ;
		this.selectSource.options.add(option);
 	}
}

DataSelectComponent.prototype.setToDestination=function(coll){
	
	var keys = coll.getKeySet();
 	for(var index=0; index<coll.size(); index++) {
 		var key = keys[index];
 		if(this.isMove && this.getSource().get(key)!=null){
 			this.removeFromSource(key);
 		}
  		var text = coll.get(key);
 		var option = document.createElement("option");
		option.value = key ;
		option.text = text ;
		this.selectDest.options.add(option);
 	}
}

DataSelectComponent.prototype.getSource=function(){
	var coll = new Collection();
	for(var index=0; index<this.selectSource.options.length; index++) {
		var option = this.selectSource.options.item(index);
		coll.add(option.value,option.text);
	}
	return coll ;
}

DataSelectComponent.prototype.getDestination=function(){
	var coll = new Collection();
	for(var index=0; index<this.selectDest.options.length; index++) {
		var option = this.selectDest.options.item(index);
		coll.add(option.value,option.text);
	}
	return coll ;
}

DataSelectComponent.prototype.clearSource=function(){
	this.selectSource.length = 0;
}

DataSelectComponent.prototype.clearDestination=function(){
	this.selectDest.length = 0 ;
}
DataSelectComponent.prototype.clear=function(){
	this.selectSource.length = 0;
	this.selectDest.length = 0 ;
}

DataSelectComponent.prototype.sortList=function(type,order){
	
}
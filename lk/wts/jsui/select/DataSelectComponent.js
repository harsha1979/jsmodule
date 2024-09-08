document.writeln("<link href='"+baseURL+"'css/DataSelectComponent.css' rel='stylesheet' type='text/css'>");	
function DataSelectComponent(parentcomp,componentid,sourceName,destName,isMove,sourceWidth,destWidth,componentName){
	//alert(dd.dd);
	if(sourceWidth==null){
		sourceWidth = '150'; 
	}
	if(destWidth==null){
		destWidth = '150'; 
	}
	this.componenthtml="<table id='"+componentid+"'>";
	
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td>"+sourceName+"</td>";
	this.componenthtml+="		<td></td>";
	this.componenthtml+="		<td>"+destName+"</td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td rowspan='4'><select size='5' class=\"selectFace\" multiple='true' style='width: "+sourceWidth+"px;' name='"+componentName+"_dscomp_sourcesel'  id='"+componentid+"_dscomp_sourcesel'></select></td>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_addone' src='jsmodule/images/select/addone.jpg'></td>";
	this.componenthtml+="		<td rowspan='4'><select size='5' class=\"selectFace\" multiple='true' style='width: "+destWidth+"px;' name='"+componentName+"_dscomp_destsel' id='"+componentid+"_dscomp_destsel'></select></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_remone' src='jsmodule/images/select/remone.jpg'></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_addall' src='jsmodule/images/select/addall.jpg'></td>";
	this.componenthtml+="	</tr>";
	this.componenthtml+="	<tr>";
	this.componenthtml+="		<td><img id='"+componentid+"_dscomp_remall' src='jsmodule/images/select/remall.jpg'></td>";
	this.componenthtml+="	</tr>";

	this.componenthtml+="</table>";
	
	
	
	this.parentcomp = parentcomp ;
	this.isMove = isMove ;
	
	this.parentcomp.innerHTML = this.componenthtml ;
	
	this.mainTable = this.getTag(this.parentcomp,'table',componentid);
	this.mainTable.dataSelectComponent = this ;
	
	this.selectSource = this.getTag(this.parentcomp,'select',componentid+'_dscomp_sourcesel');
	this.selectSource.parentComponent = this ;
	this.selectDest = this.getTag(this.parentcomp,'select',componentid+'_dscomp_destsel');
	this.selectDest.parentComponent = this ;
	this.btnAddOne = this.getTag(this.parentcomp,'img',componentid+'_dscomp_addone');
	this.btnAddOne.parentComponent = this ;
	this.btnRemOne = this.getTag(this.parentcomp,'img',componentid+'_dscomp_remone');
	this.btnRemOne.parentComponent = this ;
	this.btnAddAll = this.getTag(this.parentcomp,'img',componentid+'_dscomp_addall');
	this.btnAddAll.parentComponent = this ;
	this.btnRemAll = this.getTag(this.parentcomp,'img',componentid+'_dscomp_remall');
	this.btnRemAll.parentComponent = this ;
	
	
	this.selectSource.ondblclick = this.sourceDBClick ;
	this.selectDest.ondblclick = this.destDBClick ;
	
	
	this.btnAddOne.onclick = this.sourceToDestOne;
	this.btnRemOne.onclick = this.destToSourceOne;
	this.btnAddAll.onclick = this.sourceToDestAll;
	this.btnRemAll.onclick = this.destToSourceAll;
	
}

DataSelectComponent.prototype.selectAllDest=function(){
	var options =this.selectDest.options; 
	for(var index=0; index<options.length; index++) {
		options[index].selected = true ;
	}
}

DataSelectComponent.prototype.selectAllSource=function(){
	var options =this.selectSource.options; 
	for(var index=0; index<options.length; index++) {
		options[index].selected = true ;
	}
}


DataSelectComponent.prototype.getTag=function(node,tagName,id){
	var tags = node.getElementsByTagName(tagName);
	for(var index=0; index<tags.length; index++) {
		var tag = tags[index];
		var thisID = tag.getAttribute('ID');
		if( thisID == id){
			return tag;
		}
	}
}
DataSelectComponent.prototype.sourceDBClick=function(){
	//alert(dd.dd);
	var index = this.parentComponent.selectSource.selectedIndex ;
	if(index!=-1){
		var option = this.parentComponent.selectSource.options.item(index);
		option.selected = false ;
		this.parentComponent.selectSource.options.remove(index);
		this.parentComponent.selectDest.options.add(option);
	}
	
}

DataSelectComponent.prototype.destDBClick=function(){
	var index = this.parentComponent.selectDest.selectedIndex ;
	if(index!=-1){
		var option = this.parentComponent.selectDest.options.item(index);
		option.selected = false ;
		this.parentComponent.selectDest.options.remove(index);
		this.parentComponent.selectSource.options.add(option);
	}
	
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

DataSelectComponent.prototype.setToSource=function(map){
 	var iterator = map.entrySet();
 	while(iterator.hasNext()){
 		var key = iterator.next();
 		var text = map.get(key);
 		var option = document.createElement("option");
		option.value = key ;
		option.text = text ;
		this.selectSource.options.add(option);
 	}
}

DataSelectComponent.prototype.setToDestination=function(map){
	
	var iterator = map.entrySet();
 	while(iterator.hasNext()){
 		var key = iterator.next();
 		if(this.isMove && this.getSource().get(key)!=null){
 			this.removeFromSource(key);
 		}
  		var text = map.get(key);
 		var option = document.createElement("option");
		option.value = key ;
		option.text = text ;
		this.selectDest.options.add(option);
 	}
 	
}

DataSelectComponent.prototype.getSource=function(){
	var map = new HashMap();
	for(var index=0; index<this.selectSource.options.length; index++) {
		var option = this.selectSource.options.item(index);
		map.put(option.value,option.text);
	}
	return map ;
}

DataSelectComponent.prototype.getDestination=function(){
	var map = new HashMap();
	for(var index=0; index<this.selectDest.options.length; index++) {
		var option = this.selectDest.options.item(index);
		map.put(option.value,option.text);
	}
	return map ;
}
DataSelectComponent.prototype.getDestinationAsSet=function(){
	var set = new HashSet();
	for(var index=0; index<this.selectDest.options.length; index++) {
		var option = this.selectDest.options.item(index);
		set.add(option.value);
	}
	return set ;
}
DataSelectComponent.prototype.getSourceAsSet=function(){
	var set = new HashSet();
	for(var index=0; index<this.selectSource.options.length; index++) {
		var option = this.selectSource.options.item(index);
		set.add(option.value);
	}
	return set ;
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

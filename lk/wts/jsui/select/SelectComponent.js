function SelectComponent(parentcomp,sourceName,events,reference,width,height,isMultiSelect,id){
	//alert(dd.dd);
	
	this.type = 'SelectComponent';
	this.sourceName = sourceName ;
	this.selectSource = null ;
	if(parentcomp){
		this.componenthtml='<table cellpadding="0" cellspacing="0">';
		this.componenthtml+='	<tr>';
		this.componenthtml+='		<td><select name="'+sourceName+'_dscomp_sourcesel" class="selectFace" size="7" style="width: 160px;" id= "id_'+sourceName+'_dscomp_sourcesel"></select></td>';
		this.componenthtml+='	</tr>';
		this.componenthtml+='</table>';
		
		this.parentcomp = parentcomp ;
		
		this.parentcomp.innerHTML = this.componenthtml ;
		this.selectSource = document.getElementById(sourceName+'_dscomp_sourcesel');
	}
	
	this.selectSource =  document.getElementById(id);
	
	if(isMultiSelect){
		this.selectSource.multiple=true;
	}else{
		this.selectSource.multiple=false;
	}
	if(events!=null){
		var iterator = events.entrySet();
		while (iterator.hasNext()) {
			var next = iterator.next();
			var event = events.get(next);
			this.selectSource[next] = event;
		}
	}
	this.selectSource.reference = reference ;
	this.selectSource.parentContainer = this ;
	//this.insertDefault();
}

SelectComponent.prototype.onClickMethod=function(method){
	wts.attachedEventCBrowser(this.selectSource,'onclick',method,false);
}
SelectComponent.prototype.onChangeMethod=function(method){
	wts.attachedEventCBrowser(this.selectSource,'onchange',method,false);
}

SelectComponent.prototype.addToSource=function(value,text){
	var option = document.createElement("option");
	option.value = value ;
	option.text = text ;
	this.selectSource.options.add(option);
}

SelectComponent.prototype.removeFromSource=function(value){
	for(var index=0; index<this.selectSource.options.length; index++) {
 		var opt = this.selectSource.options[index];
 		if(opt.value==value){
 			this.selectSource.options.remove(index);
 			break ;
 		}
	}
}



SelectComponent.prototype.setToSource=function(map,defaultSelectIndex){
	this.clearSource();
 	var iterator = map.entrySet();
 	while(iterator.hasNext()){
 		var key = iterator.next();
 		var text = map.get(key);
		this.addToSource(key,text);
 	}
 	if(defaultSelectIndex){
 		this.selectSource.selectedIndex = defaultSelectIndex ;
 	}else{
 		this.selectSource.selectedIndex =-1 ;
 	}
}

SelectComponent.prototype.setToSourceAsSet=function(set,defaultSelectIndex){
	this.clearSource();
 	var iterator = set.iterator();
 	while(iterator.hasNext()){
 		var key = iterator.next();
 		this.addToSource(key,key);
 	}
 	if(defaultSelectIndex){
 		this.selectSource.selectedIndex = defaultSelectIndex ;
 	}else{
 		this.selectSource.selectedIndex =-1 ;
 	}
}


SelectComponent.prototype.getSource=function(){
	var map = new HashMap();
	for(var index=0; index<this.selectSource.options.length; index++) {
		var option = this.selectSource.options.item(index);
		map.put(option.value,option.text);
	}
	return map ;
}
SelectComponent.prototype.getSelectedItem=function(){
	var index = this.selectSource.selectedIndex ;
	if(index!=-1){
		var option = this.selectSource.options.item(index);
		return new Item(option.value,option.text);
	}
	return null ;
}
SelectComponent.prototype.getSelectedValue=function(){
	var index = this.selectSource.selectedIndex ;
	if(index!=-1){
		var option = this.selectSource.options.item(index);
		return option.value;
	}
	return null ;
}

SelectComponent.prototype.getSelectedText=function(){
	var index = this.selectSource.selectedIndex ;
	if(index!=-1){
		var option = this.selectSource.options.item(index);
		return option.text;
	}
	return null ;
}


SelectComponent.prototype.clearSource=function(){
	this.selectSource.length = 0;
	//this.insertDefault();
}
SelectComponent.prototype.insertDefault=function(){
	this.addToSource(null,'Select '+this.sourceName);
}

SelectComponent.prototype.selectAll=function(){
	var options =this.selectSource.options; 
	for(var index=0; index<options.length; index++) {
		options[index].selected = true ;
	}
}

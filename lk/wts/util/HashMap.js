function HashMap(){
	this.type='HashMap';
	this.table = new Array();
	this.tableLength = 0 ;
}
HashMap.prototype.put=function(key,val){
	var previousValue = this.get(key) ;
	this.table[key] = val ;
	if(previousValue==undefined){
		this.tableLength++;
		previousValue = null ;
	}
	return previousValue ;
}

HashMap.prototype.size=function(){
	return this.tableLength;
}


HashMap.prototype.remove=function(key){
	if(!this.containsKey(key)){
		return false ;
	}
	this.tableLength--;
	var tableTemp = new Array();
	for(var tableKey in this.table){
		if(tableKey!=key){
			tableTemp[tableKey]=this.get(tableKey);
		}
	}
	this.table = tableTemp ;
	return true; 
}

HashMap.prototype.clone=function(){
	var tableTemp = new HashMap();
	for(var tableKey in this.table){
		tableTemp.put(tableKey,this.get(tableKey));
	}
	return tableTemp ;
}

HashMap.prototype.containsKey=function(key){
	for(var tableKey in this.table){
		if(tableKey==key){
			return true ;
		}
	}
	return false ;
}
HashMap.prototype.containsValue=function(val){
	for(var tableKey in this.table){
		if(this.get(tableKey)==val){
			return true ;
		}
	}
	return false ;
}

HashMap.prototype.get=function(key){
	var currentValue = this.table[key] ;
	if(currentValue==undefined){
		currentValue = null ;
	}
	return currentValue ;
}
HashMap.prototype.isEmpty=function(){
	if(this.tableLength > 0){
		return true ;
	}
	return false ;
}
HashMap.prototype.values=function(){
	var values = new HashSet();
	
	for(var tableKey in this.table){
		values.add(this.get(tableKey));
	}
	var iterator = new Iterator(values);
	return iterator ;
}

HashMap.prototype.entrySet=function(){
	var keys = new HashSet();
	for(var tableKey in this.table){
		keys.add(tableKey);
	}
	var iterator = new Iterator(keys);
	return iterator ;
}

HashMap.prototype.clear=function(){
	this.table = new Array();
	this.tableLength = 0 ;
}
HashMap.prototype.putAll=function(hashMap){
	var iterator = hashMap.entrySet();
	while(iterator.hasNext()){
		var key = iterator.next();
		this.put(key,hashMap.get(key));
	}
}
HashMap.prototype.toArray=function(){
	return this.table;
}
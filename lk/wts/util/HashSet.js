//wts.using('lk.wts.util.Collection;');
//wts.using('lk.wts.util.Iterator;');

function HashSet(){
	this.type='HashSet';
	HashSet.extend(Collection);
	this.set = new Array();
}

HashSet.prototype.add=function(val){
	/*for(var value in this.set){
		if(value==val){
			return false ;	
		}
	}*/
	if(this.containsValue(val)){
		return null ;
	}
	this.set[this.set.length] = val ;
	return val ;
}

HashSet.prototype.addAll=function(coll){
	var arr = coll.toArray();
	for(var value in arr){
		this.add(arr[value]);
	}
}

HashSet.prototype.remove=function(val){
	for(var index=0; index<this.set.length; index++) {
		if(this.set[index]==val){
			var removedItem = this.set.splice(index,1);
			return removedItem ;
		}
	}
	return null ;
}

HashSet.prototype.removeObject=function(obj){
	for(var index=0; index<this.set.length; index++) {
		if(this.set[index].equal(obj)){
			var removedItem = this.set.splice(index,1);
			return removedItem ;
		}
	}
	return null ;
}


HashSet.prototype.clear=function(){
	this.set = new Array();
}

HashSet.prototype.clone=function(){
	var setTemp = new HashSet();
	for(var value in this.set){
		setTemp.add(value);
	}
	return setTemp ;
}


HashSet.prototype.containsValue=function(val){
	for(var value in this.set){
		if(this.set[value]==val){
			return true ;
		}
	}
	return false ;
}

HashSet.prototype.containsObject=function(obj){
	var iterator = this.iterator();
	while (iterator.hasNext()) {
		var next = iterator.next();
		if(next.equal(obj)){
			return true ;
		}
	}
	return false ;
}


HashSet.prototype.isEmpty=function(){
	if(this.size()==0){
		return true ;
	}
	return false ;
}
HashSet.prototype.size=function(){
	return this.set.length ;
}
HashSet.prototype.iterator=function(){
	var iterator = new Iterator(this);
	return iterator;
}

HashSet.prototype.toArray=function(){
	return this.set;
}




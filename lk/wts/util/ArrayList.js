function ArrayList(){
	this.type='ArrayList';
	this.arrayList = new Array();
}

ArrayList.prototype.add=function(val){
	this.arrayList[this.arrayList.length] = val ;
}

ArrayList.prototype.addAll=function(set){
	if(set.type=='HashSet'){
		this.arrayList = set.toArray();
	}
	this.arrayList = set ;
}


ArrayList.prototype.addForIndex=function(index,val){
	if(this.arrayList.length>index){
		this.arrayList.splice(index,0,val);
		return true ;
	}
	return false ;
}

ArrayList.prototype.remove=function(index){
	if(this.arrayList.length>index){
		var removedItem = this.arrayList.splice(index,1);
		return removedItem ;
	}
	return null  ;
}
ArrayList.prototype.removeByValue=function(value){
 	var index = this.indexOf(value);
 	if(index!=-1){
 		this.remove(index);
 		return true ;
 	}
 	return false ;
}

ArrayList.prototype.removeByObject=function(obj){
	var iterator = this.iterator();
	while (iterator.hasNext()) {
		var next = iterator.next();
		if(next.equal(obj)){
			iterator.remove();
			break;
		}
	}
}


ArrayList.prototype.clear=function(){
	this.arrayList = new Array();
}

ArrayList.prototype.clone=function(){
	var arrayListTemp = new ArrayList();
	for(var value in this.arrayList){
		arrayListTemp.add(value);
	}
	return arrayListTemp ;
}


ArrayList.prototype.contains=function(val){
	for(var value in this.arrayList){
		if(value==val){
			return true ;
		}
	}
	return false ;
}
ArrayList.prototype.containsObject=function(obj){
	while (this.iterator.hasNext()) {
		var next = this.iterator.next();
		if(next.equal(obj)){
			return true ;
		}
	}
	return false ;
}

ArrayList.prototype.get=function(index){
	if(this.arrayList.length>index){
		return this.arrayList[index];
	}
	return null;
}

ArrayList.prototype.isEmpty=function(){
	if(this.arrayList.length > 0){
		return true ;
	}
	return false ;
}
ArrayList.prototype.size=function(){
	return this.arrayList.length ;
}
ArrayList.prototype.iterator=function(){
	var iterator = new Iterator(this);
	return iterator;
}
ArrayList.prototype.removeRange=function(index,range){
	if(this.arrayList.length>(index+range)){
		this.arrayList.splice(index,(index+range));
		return true ;
	}
	return false ;
}
ArrayList.prototype.indexOf=function(value){
	for(var index=0; index<this.arrayList.length; index++) {
		if(this.arrayList[index]==value){
			return index ;
		}
	}
	return -1 ;
}
ArrayList.prototype.toArray=function(){
	return this.arrayList;
}





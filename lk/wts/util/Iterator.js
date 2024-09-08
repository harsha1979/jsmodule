function Iterator(collection){
	if(collection){
		this.collection = collection ;
		this.array = this.collection.toArray() ;
	}
	this.cursor = -1 ;
}
Iterator.prototype.hasNext=function(){
	if(this.array){
		if(this.array.length-1 > this.cursor){
			return true ;
		}
	}
	return false ;
}

Iterator.prototype.next=function(){
	if(this.array){
		this.cursor++;
		var value = this.array[this.cursor];
		return value ;
	}
	return null ;
}

Iterator.prototype.remove=function(){
	if(this.array){
		var value = this.array[this.cursor];
		this.collection.remove(value);
		return true ;
	}
	return false ;
}

Iterator.prototype.removeObject=function(){
	if(this.array){
		var value = this.array[this.cursor];
		this.collection.removeObject(value);
		return true ;
	}
	return false ;
}
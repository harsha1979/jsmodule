
function Collections(){
	this.type='Collections' ;
}
Collections.sort=function(collection,comparator){
	var asArray = collection.toArray();
	asArray.sort(comparator.compare);
}

function Comparator(){
	this.type='Comparator' ;
}
Comparator.prototype.compare=function(first,second){
	if(first==second){
		return 0;
	}else if(first>second){
		return -1;
	}else if(first<second){
		return 1;
	}
}
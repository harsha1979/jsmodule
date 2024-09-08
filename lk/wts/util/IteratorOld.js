function Iterator(vec){
	
	this.vector=vec;
	this.hasMoreElement=hasMoreElement;
	this.next=next;
	
		function hasMoreElement(){			
			return this.vector.size()>0;
		
		}
		
		function next(){
			return this.vector.remove(0);		
		}

}
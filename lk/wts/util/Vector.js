 function Vector() {
 /* --CCollection object-- */
      var lsize = 0;
 
      this.add = add;
      this.remove = remove;
      this.isEmpty = isEmpty;
      this.size = size;
      this.clear = clear;
      this.clone = clone;
      this.addTo = addTo;
      this.getElementAt = getElementAt;
      
      function add(newItem) {
      /* --adds a new item to the collection-- */
           if (newItem == null) return;
 
           lsize++;
           this[(lsize - 1)] = newItem;
      }
      
      function addTo(index,newItem) {
			      /* --adds a new item to the collection-- */
			           if (newItem == null) return;
			           
			 						lsize++;
			 						
									for(var i=lsize;i>index;i--){									
										this[lsize] =this[(lsize - 1)] ;										
									}
									
			           //lsize++;
			           this[index] = newItem;
      }
      
      function getElementAt(index) {              
					 
					 if(typeof(this[index]) == 'undefined') {					
							 return null;
					 }else{					 	
					 		return this[index];
					 }
			}
 
      function remove(index) {
      /* --removes the item at the specified index-- */
           if (index < 0 || index > this.length - 1) return;
           var temp=this[index];
           this[index] = null;
 
           /* --reindex collection-- */
           for (var i = index; i <= lsize; i++)
                this[i] = this[i + 1];
 
           lsize--;
           return temp;
      }
 
      function isEmpty() { return lsize == 0 }     /* --returns boolean if collection is/isn't empty-- */
 
      function size() { return lsize }     /* --returns the size of the collection-- */
 
      function clear() {
      /* --clears the collection-- */
           for (var i = 0; i < lsize; i++)
                this[i] = null;
 
           lsize = 0;
      }
 
      function clone() {
      /* --returns a copy of the collection-- */
           var c = new Vector();
 
           for (var i = 0; i < lsize; i++)
                c.add(this[i]);
 
           return c;
      }
 }
 


function TableCellEditor(component){

	this.component=component;
	this.count=2;
	
}

TableCellEditor.prototype.setClickCountToStart=function(count){
	
	this.count=count;
	
}

TableCellEditor.prototype.getComponent=function(){
	
	return this.component;
	
}

TableCellEditor.prototype.onDblClick=function(obj,type){
	
	
	if(this.count==2){
		var parentEditor=this;
		if(this.component){
			if(this.component.options){
				// a combo box
				
				this.component.value=obj.innerText;
				for(var i=0;i<this.component.options.length;i++){

					if(this.component.options[i].value==obj.innerText){
						this.component.options[i].selected=true;
						break;
					}
				}
				this.component.onblur=function(){
																	this.removeNode(true);																
																	obj.innerText=this.options[this.selectedIndex].value;

															}

			}else{

				if(this.component.type=='checkbox'){

					//alert("check box");
					this.component.onblur=function(){
																		this.removeNode(true);
																		obj.innerText=this.value;

																}

				}else{			
					//alert("text box");
					this.component.value=obj.innerText;
					this.component.valueType=type;
					
					this.component.onblur=function(){
																		
																		if(this.valueType.toUpperCase()=="INTEGER" || this.valueType.toUpperCase()=="NUMBER"){
																			if(isNaN(this.value)){
																				alert("Invalid Entry");
																				this.focus();
																				this.select();
																			}else{
																				this.removeNode(true);
																				obj.innerText=this.value;		
																			}
																		}else{
																				this.removeNode(true);
																				obj.innerText=this.value;		
																		}
																																		
																}
				}
			}

			if(obj.firstChild){					
				obj.firstChild.replaceNode(this.component);
			}else{					
				obj.insertAdjacentElement("afterBegin",this.component);
			}
			this.component.focus();	
			this.component.select();
		}	
	}
	
}


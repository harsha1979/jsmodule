function JSScrollPaneProperties(){


	this.type='JSScrollPaneProperties';
	
	

	/* Object Propeties ------------ */
	
	this.height=null;
	this.setHeight=setHeight;
	this.getHeight=getHeight;

	this.width=null;
	this.setWidth=setWidth;
	this.getWidth=getWidth;

	
	this.overflowY=null;
	this.setOverflowY=setOverflowY;
	this.getOverflowY=getOverflowY;
	
	this.overflowX=null;
	this.setOverflowX=setOverflowX;
	this.getOverflowX=getOverflowX;


	this.borderStyle=null;
	this.setBorderStyle=setBorderStyle;
	this.getBorderStyle=getBorderStyle;

	this.borderWidth=null;
	this.setBorderWidth=setBorderWidth;
	this.getBorderWidth=getBorderWidth;
	
	
	this.setSize = setSize;
	
	
	/* Object Methods -------------- */
	
	function setHeight(pHeight){
		this.height=pHeight;
	}
	function getHeight(){
		return this.height;
	}
	
	

	function setWidth(pWidth){
		this.width=pWidth;
	}
	function getWidth(){
		return this.width;
	}
	
	function setSize(height,width){
				this.height = height;
				this.width = width ;
	}
	
	function setBorderStyle(pBorderStyle){
		this.borderStyle=pBorderStyle;
	}
	function getBorderStyle(){
		return this.borderStyle;
	}
	function setBorderWidth(pBorderWidth){
		this.borderWidth=pBorderWidth;
	}
	function getBorderWidth(){
		return this.borderWidth;
	}
	
		
	function setOverflowY(pOverflowY){
		this.overflowY=pOverflowY;
	}
	function getOverflowY(){
		return this.overflowY;
	}
	function setOverflowX(pOverflowX){
		this.overflowX=pOverflowX;
	}
	function getOverflowX(){
		return this.overflowX;
	}
	 

}
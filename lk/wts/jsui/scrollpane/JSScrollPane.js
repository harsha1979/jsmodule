
wts.using('lk.wts.jsui.scrollpane.JSScrollPaneProperties;');

function JSScrollPane(){

	this.type='JSScrollPane';
	
	this.scrollPane = null ;
	
	this.jsScrollPaneProperties = null ;
	
	this.createJSScrollPane = createJSScrollPane ;
	
	this.getJSScrollPane = getJSScrollPane;
	
	this.add = add ;
	
	this.getProperties = getProperties ;
	
	
	this.createHorizontalScrollBar = createHorizontalScrollBar;
	this.createVerticalScrollBar = createVerticalScrollBar ;
	this.createScrollBar = createScrollBar;

	this.setSize = setSize ;
	
	this.setBorder = setBorder ;
	
	
	function createJSScrollPane(){
		scrollPane = document.createElement('div');
		scrollPane.style.position ='absolute';
		return scrollPane ;
			
	}
	
	
	//scrollBarType : 'both' , 'hor' , 'ver' ,'non'
	
	function createJSScrollPane(scrollBarType){
	
		scrollPane = document.createElement('div');
		scrollPane.style.position ='absolute';
		
		if(this.jsScrollPaneProperties==null){
			this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
		
		
		
		if(scrollBarType=='both'){
			
			scrollPane.style.overflowX = 'scroll';
			scrollPane.style.overflowY = 'scroll';
			this.jsScrollPaneProperties.setOverflowX('scroll');
			this.jsScrollPaneProperties.setOverflowY('scroll');
			
		}else if(scrollBarType=='hor'){
		
			scrollPane.style.overflowX = 'scroll';
			this.jsScrollPaneProperties.setOverflowX('scroll');
			
		}else if(scrollBarType=='ver'){
		
			scrollPane.style.overflowY = 'scroll';
			this.jsScrollPaneProperties.setOverflowY('scroll');
		
		}
		
		return scrollPane ;
				
	}
	
	function getJSScrollPane(){
		return scrollPane ;
	}
	

	function getProperties(){
			
		return this.jsScrollPaneProperties ;
	}
	
	

	function add(component){	
			if(scrollPane.firstChild){			
						scrollPane.replaceChild(component,scrollPane.firstChild);
			}else{			
						scrollPane.insertAdjacentElement("afterBegin",component);
			}				
	}
	
	function append(component){	
					
			scrollPane.insertAdjacentElement("afterBegin",component);
						
	}
	
	
	function createHorizontalScrollBar(){
		if(this.jsScrollPaneProperties==null){
			this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
		scrollPane.style.overflowX = 'scroll';
		this.jsScrollPaneProperties.setOverflowX('scroll');
	} 
		
		
	function createVerticalScrollBar(){
		if(this.jsScrollPaneProperties==null){
					this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
		scrollPane.style.overflowY = 'scroll';
		this.jsScrollPaneProperties.setOverflowY('scroll');
	} 
		

	function createScrollBar(){
		
		if(this.jsScrollPaneProperties==null){
			this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
		
		
		
		scrollPane.style.overflowX = 'scroll';
		scrollPane.style.overflowY = 'scroll';
		this.jsScrollPaneProperties.setOverflowX('scroll');
		this.jsScrollPaneProperties.setOverflowY('scroll');
		
	}
	
	
	function setSize(width,height){
	
		
		if(this.jsScrollPaneProperties==null){
			this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
		
		
		this.jsScrollPaneProperties.setWidth(width);
		this.jsScrollPaneProperties.setHeight(height);
				
		scrollPane.style.width = this.jsScrollPaneProperties.getWidth();
		scrollPane.style.height = this.jsScrollPaneProperties.getHeight();
	}
	
	
	
	function setBorder(borderWidth,borderStyle){
		if(this.jsScrollPaneProperties==null){
			this.jsScrollPaneProperties = new JSScrollPaneProperties(); 		
		}
				
				
		this.jsScrollPaneProperties.setBorderWidth(borderWidth);
		this.jsScrollPaneProperties.setBorderStyle(borderStyle);
						
		scrollPane.style.borderWidth = this.jsScrollPaneProperties.getBorderWidth();
		scrollPane.style.borderStyle = this.jsScrollPaneProperties.getBorderStyle();
	}


}

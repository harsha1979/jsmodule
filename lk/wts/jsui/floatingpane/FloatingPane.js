//document.body.attachEvent('onmouseup', this.fireMouseUpOnPanes);
var popupwin=null;
function FloatingPane(factory){    
  this.type = "FloatingPane";  
  this.container = document.createElement("<div id ='wtsBaseDiv' wtstype='floatingpane' style='border: 1px solid CornflowerBlue;position:absolute;align:top;'>");	
  this.xCo = 0;
  this.yCo = 0;
  this.container.onmousemove = this.onMouseMove;  
  this.container.onmousedown = this.onMouseDown;  
  this.container.onmouseup   = this.onMouseUp;
  this.container.onlmouseleave   = this.onLoseCapture;

  this.factory = factory;
  //this.popup = popUp();  //this is for loggin purposes
  this.container.parent = this;
  //popupwin = this.popup;
  //Toolbar contents
  this.btnEdit = document.createElement("<img src='" + projectJsPath+"jsmodule/lk/wts/jsui/floatingpane/b1.gif'>");	
  this.btnSave = document.createElement("<img src='" + projectJsPath+"jsmodule/lk/wts/jsui/floatingpane/b2.gif'>");	  
  this.tblBase = document.createElement("<TABLE id='wtsBaseTable' ALIGN='left' BORDER=0 CELLSPACING=0 CELLPADDING=0 >");	
  this.setToolBar();

  this.btnEdit.onclick = this.onMouseClickOnEdit;  
  this.btnEdit.tblBase=this.tblBase;
  this.btnSave.onclick = this.onMouseClickOnSave;
}

function findFloatingPanePosY(obj)
{
	//alert(obj.outerHTML);
	//popupwin.document.writeln('--------------------- <br>hhhh'+ obj.offsetTop+'hhhh');
	if(obj.tagName=="DIV" && obj.offsetParent.wtstype){
	  alert("1");
		return obj.offsetTop;
	}
	var curtop = 0;
	if (obj.offsetParent)
	{
	//popupwin.document.writeln('--------------------- <br>'+ obj.outerHTML);
		while (!obj.offsetParent.wtstype && obj.offsetParent.wtstype!="floatingpane")
		{			
	  //alert(obj.outerHTML);

			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
		//alert(obj.offsetParent.wtstype);
	}
	else if (obj.y)
		curtop += obj.y;		
	return curtop;
}

function findFloatingPanePosX(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (!obj.offsetParent.wtstype && obj.offsetParent.wtstype!="floatingpane")
		{
			curtop += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curtop += obj.x;
		
	return curtop;
}

FloatingPane.prototype.setToolBar = function(){	
        var firstRow  = this.tblBase.insertRow();
        var secondRow = this.tblBase.insertRow();
        
        firstRow.bgColor = 'CornflowerBlue';
        firstRow.align = "center";  
       // secondRow.align = "top";  
        
	var aTD1   = firstRow.insertCell();
	//aTD1.width = '20%';
	aTD1.height= '25px';
  aTD1.align = "left";

	var aTD2   = firstRow.insertCell();
  aTD2.innerHTML = "<b>Floating Pane</b>";
  aTD2.width = '80%';
  aTD2.align = "center";
  aTD2.setAttribute("titleTD","true");

	var aTD3   = firstRow.insertCell();
  aTD3.align = "right";
  aTD3.setAttribute("btnTD","true");
	aTD3.appendChild(this.btnEdit);
	//aTD3.appendChild(this.btnSave);

	var sTD    = secondRow.insertCell();
	sTD.height = '100%';
	sTD.colSpan= 3;
  //sTD.bgColor = 'red';
	sTD.vAlign = 'top';
	this.container.insertAdjacentElement("afterBegin",this.tblBase);	
	//alert(this.tblBase.outerHTML);
}

FloatingPane.prototype.setContent = function(content){	
  //Container maintais only one child
  //alert(content.outerHTML);      
	var colRows = this.tblBase.rows;
	if(colRows[1].cells[0].firstChild){			
		colRows[1].cells[0].replaceChild(content,colRows[1].cells[0].firstChild);
	}else{			
		colRows[1].cells[0].insertAdjacentElement("afterBegin",content);
	}  
	
	var child = colRows[1].cells[0].firstChild.outerHTML;
  colRows[1].cells[0].style.align="top";
  //alert(child);
	if(content.tagName=="DIV"){
		colRows[1].cells[0].firstChild.style.position = 'relative';
 	}	
}

FloatingPane.prototype.getFloatingPaneObject = function(){	
	return this;
}

FloatingPane.prototype.getFloatingPane = function(){	
	return this.container;
}

/**Set the child's style using a class */
FloatingPane.prototype.setStyleName = function(name){
	 //alert("this.container.style: "+this.container.style.cssText)
	 this.container.firstChild.className      = name;
	 this.container.firstChild.style.position = 'relative';	
     this.tblBase.width  = this.container.style.width ;
     this.tblBase.height = this.container.style.height ;
}

/**Set the child's style using a string param */
FloatingPane.prototype.setStyleByString = function(string){		
	this.tblBase.rows[1].cells[0].firstChild.style.cssText = this.container.firstChild.style.cssText +";" +string;
	//this.tblBase.rows[1].cells[0].firstChild.style.position = 'relative';	
 	this.container.style.width  = this.tblBase.rows[1].cells[0].firstChild.style.width ;
	this.container.style.height = this.tblBase.rows[1].cells[0].firstChild.style.height ;
	this.tblBase.width          = this.container.style.width ;
	this.tblBase.height	    = this.container.style.height ;
	
}

FloatingPane.prototype.getStyleByString = function(){		
	 return this.container.firstChild.style.cssText;
}

/** Floating Pane height */
FloatingPane.prototype.setHeight = function(height){		
	 this.container.style.height = height;	
	 this.tblBase.height= height;
}

FloatingPane.prototype.getHeight = function(){		
	 return this.container.style.height;
}

/** Floating Pane width */
FloatingPane.prototype.setWidth = function(width){		
	 this.container.style.width 	= width;
	 this.tblBase.width		= width;
}

FloatingPane.prototype.getWidth = function(){		
	 return this.container.style.width;
}

/** Floating Pane background color */
FloatingPane.prototype.setBackgroundColor = function(bgColor){		
	 this.container.firstChild.style.backgroundColor = bgColor;
}

FloatingPane.prototype.getBackgroundColor = function(){		
	 return this.container.firstChild.style.backgroundColor;
}


FloatingPane.prototype.setPagePositionX = function(left){		
	 this.container.style.left = left;	
}

FloatingPane.prototype.setPagePositionY = function(top){			
	 this.container.style.top = top;	 
}

FloatingPane.prototype.onMouseDown = function(){
	this.parent.ready = 'true';
	//alert(this.parent.container.outerHTML);	
	this.parent.xCo   = event.offsetX;
	this.parent.yCo   = event.offsetY;
	this.parent.yCoAdj   = findFloatingPanePosY(event.srcElement);
	this.parent.xCoAdj   = findFloatingPanePosX(event.srcElement);
	var src=event.srcElement;
	//alert(src.parent.container.wtstype);
	if(src.parentElement.parentElement.parentElement.parentElement!=this){
		//alert("jjjj"+this.parent.yCo);
		//
		if(src.parentElement.getAttribute("titleTD")!=null){
			this.parent.xCo=this.parent.xCo -src.offsetLeft;
			this.parent.yCo=this.parent.yCo-src.parentElement.offsetTop - src.offsetTop ;
		}else	if(src.parentElement.getAttribute("btnTD")!=null){
			//this.parent.xCo=this.parent.xCo -src.offsetLeft;
			this.parent.yCo=this.parent.yCo-src.parentElement.offsetTop - src.offsetTop ;
		}else{
						this.parent.yCo=this.parent.yCo+28;
						this.parent.xCo=this.parent.xCo+3;
		}

	}
	
	/*while(src!=this){
		this.parent.xCo+=src.offsetLeft;
		this.parent.yCo+=src.offsetTop-23;
		src=src.parentElement;
	}*/
	
	//alert(this.parent.yCo);
	
	
   //new
	this.parent.container.style.left = event.clientX  - (this.parent.xCo+3)-this.parent.xCoAdj;
	this.parent.container.style.top  = event.clientY   - (this.parent.yCo)-this.parent.yCoAdj-3;
	/*
	this.parent.popup.document.writeln('--------------------- <br>');
	this.parent.popup.document.writeln('Down  : ' + this.parent.container.style.left + ',' + this.parent.container.style.top+' <br>');
  this.parent.popup.document.writeln('Down  : ' + event.clientX + ',' + event.clientY  + ' <br>');
  this.parent.popup.document.writeln('Down  : xCo ' + this.parent.xCo + ',yCo ' + this.parent.yCo  + ' <br>');
  this.parent.popup.document.writeln('Down  : xCoAdj  ' + this.parent.xCoAdj + ',yCoAdj  ' + this.parent.yCoAdj  + ' <br>');
  */
}

FloatingPane.prototype.onMouseMove = function(){
      if(this.parent.ready == 'true'){
				this.parent.container.style.left = (event.clientX + this.parent.pageScrolledToX())- (this.parent.xCo+3)-this.parent.xCoAdj;
				this.parent.container.style.top  = (event.clientY + this.parent.pageScrolledToY()) - (this.parent.yCo)-this.parent.yCoAdj-3;		
      } 
}

FloatingPane.prototype.onMouseUp = function(){
	this.parent.ready = 'false';      
	this.parent.container.style.left = (event.clientX + this.parent.pageScrolledToX()) - (this.parent.xCo+3)-this.parent.xCoAdj;
	this.parent.container.style.top  = (event.clientY + this.parent.pageScrolledToY())  - (this.parent.yCo)-this.parent.yCoAdj-3;
	/*this.parent.popup.document.writeln('Up :'  +this.parent.container.style.left + ',' + this.parent.container.style.top + ' <br>');
  this.parent.popup.document.writeln('Up  : xCo ' + this.parent.xCo + ',yCo ' + this.parent.yCo  + ' <br>');
  this.parent.popup.document.writeln('Up  : xCoAdj  ' + this.parent.xCoAdj + ',yCoAdj  ' + this.parent.yCoAdj  + ' <br>');
  */
}

FloatingPane.prototype.onLoseCapture = function(){
	this.parent.ready = 'null';
}

FloatingPane.prototype.pageScrolledToX = function(){ //returns the scrolled pixels to the x direction
	var x;
	if (self.pageXOffset) // all except Explorer
	{
		x = self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)// Explorer 6 Strict
	{
		x = document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		x = document.body.scrollLeft;
	}
	return x;
}

FloatingPane.prototype.pageScrolledToY = function(){
	var y;
	if (self.pageYOffset) // all except Explorer
	{
		y = self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)// Explorer 6 Strict
	{
		y = document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		y = document.body.scrollTop;
	}
	return y;
}

FloatingPane.prototype.onMouseClickOnEdit = function(){
        //alert("onMouseClickOnEdit clicked");
        showPopUpForEdit(event.srcElement.tblBase.rows[1].cells[0].firstChild);
}

FloatingPane.prototype.onMouseClickOnSave = function(){
        //alert("onMouseClickOnSave clicked");
}

FloatingPane.prototype.destroyOuter = function(location){
        var left = this.container.style.left;
        var top  = this.container.style.top;        
        if(this.tblBase.rows[1].cells[0].firstChild!=null){
		var element = this.tblBase.rows[1].cells[0].firstChild.removeNode(true);
		element.style.left = left;
		element.style.top  = top;
		element.style.position = "absolute";
		location.appendChild(element);  
	}
	this.container.removeNode(true);	
}

FloatingPane.prototype.getZIndex = function(){		
	 return this.container.style.zIndex;
}

FloatingPane.prototype.setZIndex = function(value){		
	 this.container.style.zIndex = value;
}

FloatingPane.prototype.setTitle = function(title){	
	this.tblBase.rows[0].cells[1].innerHTML = "<b>" + title + "</b>"; 
}

FloatingPane.prototype.getTitle = function(){	
	return this.tblBase.rows[0].cells[1].innerHTML;
}





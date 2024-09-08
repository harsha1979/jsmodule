function ToolTip(){
	this.type='ToolTip';
	this.content = null ;
	this.visible = false ;
	this.base = null ;
}
ToolTip.prototype.show=function(source,base,left,top,width,height){
	if(this.content){
		this.content.parentNode.removeChild(this.content);
	}
	this.base = base ;
	this.content = document.createElement('div');
	this.content.style.position ='absolute';
	this.content.innerHTML = source ;
	document.body.appendChild(this.content);
	//this.content.style.left =  left + document.body.scrollLeft;
	//this.content.style.top =  top +document.body.scrollTop ;
	
	this.content.style.left =   left + document.body.scrollLeft+"px";//findPosX(base)+base.offsetWidth;
	this.content.style.top =   findPosY(base)-this.content.offsetHeight+"px"; //+ document.body.scrollTop ;
	
	this.visible = true ;
		
}
ToolTip.prototype.hide=function(){
	//&& this.base.outerHTML!=event.srcElement.outerHTML
	if(this.content ){
		this.content.parentNode.removeChild(this.content);
		this.content = null ;
		this.visible = false ;
	}
	
}
ToolTip.prototype.refresh=function(left,top){
	this.content.style.left =  left + document.body.scrollLeft;
	this.content.style.top =  top +document.body.scrollTop ;
}

function findPosX(obj){
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			curleft -= obj.scrollLeft;
			obj = obj.offsetParent;
		}
	}else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj){
	var curtop = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			curtop -= obj.scrollTop;
			obj = obj.offsetParent;		
		}
		
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}
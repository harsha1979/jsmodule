//wts.using('lk.wts.ajax.AJAXController');
function Common(){
	this.type='Common';
}
Common.prototype.loadDOM=function(xml){
	var xmlDoc = null ;
	try //Internet Explorer
	{
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.loadXML(xml);
	}catch(ee){
	  try{
		    parser=new DOMParser();
		    xmlDoc=parser.parseFromString(xml,"text/xml");
	    }catch(eee) {alert(eee.message)}
	 }


 	return xmlDoc ;
}

Common.prototype.findPosX=function(obj){
	var curleft = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}else if (obj.x)
		curleft += obj.x;
	return curleft;
}
Common.prototype.findPosY=function(obj){
	var curtop = 0;
	var parentID=obj.id.split("_")[0];
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;		
		}
		
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}
var Common = new Common();
/*function Common.findPosX(obj){
	var curleft = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function Common.findPosY(obj){
	var curtop = 0;
	var parentID=obj.id.split("_")[0];
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;		
		}
		
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}*/

/*function Common.loadDOM(xml){
	var xmlDom = new ActiveXObject('Microsoft.XMLDOM');
 	xmlDom.loadXML(xml);
 	return xmlDom ;
}*/
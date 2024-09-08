wts.using("lk.wts.jsaxb.DOMFactory;");	
wts.using("lk.wts.jsaxb.ObjectFactory;");	
wts.using("lk.wts.comm.Common;");
wts.using("lk.wts.util.HashSet;");



function XMLObjectBuilder(){
	this.xmlDom = null ;
}

XMLObjectBuilder.prototype.xmlToObject=function(xml){
	//alert(dd.dd);
	this.xmlDom = Common.loadDOM(xml);
	var rootElement = null ;
	
	if(this.xmlDom.childNodes.length==2){
		rootElement =  this.xmlDom.childNodes[1] ;
	}else{
		rootElement = this.xmlDom.firstChild; 
	}
	 
	var rootObject = null ;
	if(rootElement!=null){
		if(this.isHashSet(rootElement)){
			var set = new HashSet();
			for(var current=0;current<rootElement.childNodes.length;current++){
				var aNode = rootElement.childNodes.item(current);
				if(aNode.nodeType==3){
					continue ;
				}
				set.add(this.fillObject(aNode));
			}
			return set ;
		}else{
			rootObject= this.fillObject(rootElement);
		}
	}
	return rootObject ;
}

XMLObjectBuilder.prototype.fillObject=function(node){
	
		var objectFactory=new ObjectFactory() ;
		
		var obj = null ; 
		
		try{
			obj = objectFactory.createObject(node.nodeName) ;
		}catch(exx){
			wts.warning(node.nodeName+" not in this Object.");
			return null ;
		}
		
		var attrs = node.attributes;
		for(var index=0; index<attrs.length; index++) {
			var attr = attrs[index];
			var methodName  = attr.nodeName.substring(0,1).toUpperCase()+attr.nodeName.substring(1);
			try{
				obj["set"+methodName](attr.nodeValue);
			}catch(exx){
				wts.warning("set"+methodName +" not in this Object.");
			}
		}
		
		for(var current=0;current<node.childNodes.length;current++){
			
			var aNode = node.childNodes.item(current);
			var aNodeName  =  aNode.nodeName ;
			//var aNodeValue  =  aNode.textContent ;
			
			if(this.isHashSet(aNode)){
				var set = new HashSet();
				for(var i=0;i<aNode.childNodes.length;i++){
					var iNode = aNode.childNodes.item(i);
					if(iNode.nodeType==3){
						continue ;
					}
					set.add(this.fillObject(iNode));
				}
				try{
					obj["set"+aNodeName](set);
				}catch(exx){
					wts.warning("set"+aNodeName +" not in this Object.");
				}
			}else if(aNode.childNodes.length==1 && aNode.childNodes[0].nodeType==3){
				try{
					obj["set"+aNodeName](aNode.childNodes[0].nodeValue);
				}catch(exx){
					wts.warning("set"+aNodeName +" not in this Object.");
				}
			}else if(aNode.childNodes.length>0){
				try{
					obj["set"+aNodeName](this.fillObject(aNode));
				}catch(exx){
					wts.warning("set"+aNodeName +" not in this Object.");
				}
				
			}
		}
		return obj;
}


XMLObjectBuilder.prototype.objectToXml=function(obj){
	//alert(obj.type);
	if(obj.type=='HashSet' || obj.type=='ArrayList'  ){
		
		var itor=obj.iterator();
		var rootDom = null ;
		var domFactoryRoot = null ;
		var xml = "" ;
		while(itor.hasNext()){
			var subObj=itor.next();
			var rootName = subObj.type ;
			if(rootDom==null){
				domFactoryRoot = new DOMFactory(rootName+"s");
				rootDom = domFactoryRoot.getRootObject();
			}
			var domFactory = new DOMFactory(rootName);
			var domObj = domFactory.getRootObject();
	  		this.fillDOM(domFactory,domObj,subObj);
	  		rootDom.appendChild(domObj);
		}
		if(domFactoryRoot){
			var respXML="";
		  	if(wts.browser == "Microsoft Internet Explorer"){
				respXML=domFactoryRoot.documentObject.xml;
			}else{
				respXML=new XMLSerializer().serializeToString(domFactoryRoot.documentObject);
			}
			//xml = domFactoryRoot.documentObject.xml; 
		}
		return respXML;
	}else{
		var rootName = obj.type ;
		var domFactory = new DOMFactory(rootName);
	  	var domObj = domFactory.getRootObject();
	  	this.fillDOM(domFactory,domObj,obj);
	  	var respXML="";
	  	if(wts.browser == "Microsoft Internet Explorer"){
			respXML=domFactory.documentObject.xml;
		}else{
			respXML=new XMLSerializer().serializeToString(domFactory.documentObject);
		}
	 	return respXML;
	}
}



XMLObjectBuilder.prototype.fillDOM=function(domFactory,domObj,obj){

	for(var property in obj){
		/*if(property.substring(0,3)=='set'){
			var element = domFactory.getElementFor(property.substring(3));
			var o = obj["get"+property.substring(3)]();
			if(o!=null){
				element.text = o;
				domObj.appendChild(element);
			}
		}*/
		var element = property.substring(3);
		if(property.substring(0,3)=='get'){
			
			var objSub =  null ;
			try{
				objSub = obj["get"+element]();
			}catch(exx){
				wts.warning(element + " name not found in object.");
			}
			
			if(objSub!=null){
				if(objSub.type=='HashSet' || objSub.type=='ArrayList'){
					var subElement = domFactory.getElementFor(element);
					domObj.appendChild(subElement);
					var iterator = objSub.iterator();
					while(iterator.hasNext()){
						var objSubNode = iterator.next();
						var subSubElement = domFactory.getElementFor(objSubNode.type);
						subElement.appendChild(subSubElement);
						this.fillDOM(domFactory,subSubElement,objSubNode);
					}
				}else if(objSub.type!=undefined){
					var subElement = domFactory.getElementFor(element);
					domObj.appendChild(subElement);
					this.fillDOM(domFactory,subElement,objSub);
				}else{
					var subElement = domFactory.getElementFor(element);		
					domObj.appendChild(subElement);			
					subElement.appendChild(domFactory.getTextNode(objSub));
					
				}
			}
		}
	}
}



XMLObjectBuilder.prototype.isHashSet=function(node){
	
	var childs = node.childNodes;
	if(childs==null){
		return false ;
	}
	var currentNodeName = null ;
	for(var current=0;current<childs.length;current++){
		var child = childs[current];
		if(child.nodeType==3){
			continue ;
		}
		var childNodeName = child.nodeName ;
		if(childs.length==1 && (childNodeName+"s")==node.nodeName){
			return true ;
		}
		if(current>0){
			if(currentNodeName==child.nodeName){
				return true ;
			}else{
				break ;
			}
		}
		currentNodeName = child.nodeName ;
	}
	return false ;
	
}

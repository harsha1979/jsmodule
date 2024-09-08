wts.using('lk.wts.util.*');	
function FloatingPaneFactory(){ 
  //alert("FloatingPaneFactory" + serverPath);		  
  this.type = "FloatingPaneFactory";
  this.colPanes = new Vector();
  document.body.attachEvent('onmouseup', this.fireMouseUpOnPanes); 
  document.body.factory = this;
}

FloatingPaneFactory.prototype.createPane = function(){
  	var pane = new FloatingPane(this);
    this.colPanes.add(pane);
	return pane;
}

FloatingPaneFactory.prototype.getPanes = function(){
	return this.colPanes;
}

FloatingPaneFactory.prototype.fireMouseUpOnPanes = function(){
        for(var i=0;i<document.body.factory.colPanes.size();i++){
        	document.body.factory.colPanes[i].ready = 'false';
        }
}



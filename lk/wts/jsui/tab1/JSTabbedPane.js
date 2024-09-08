wts.using('lk.wts.jsui.tab.JSPanel;');
wts.using('lk.wts.util.*;');


function JSTabbedPane(){
	this.JSTabbedPane();
}
JSTabbedPane.prototype.JSTabbedPane=function(){
	this.type='JSTabbedPane';
	this.panelsList = new ArrayList();
	this.container = null ;
	
	this.tabbedPaneView = null ;
	this.controllerView = null ;
	this.containerView = null ;
	this.selectedController = null ;
	this.scrollerControllerView = null ;
	//this.scrollerView = null ;
}


JSTabbedPane.containerStyle = 'container';
JSTabbedPane.normalLabelStyle = 'normalLabel';
JSTabbedPane.firstLabelStyle = 'firstLabel';
JSTabbedPane.selectedLabelStyle = 'selectedLabel';
JSTabbedPane.controllerStyle = 'controller';



JSTabbedPane.prototype.addPanel=function(panel){
	this.panelsList.add(panel)
}
JSTabbedPane.prototype.getPanel=function(){
	this.panelsList ;
}
JSTabbedPane.prototype.setPanel=function(panelsList){
	this.panelsList = panelsList;
}

JSTabbedPane.prototype.loadTabbedPane=function(container){
	this.container = container ;
	
	this.tabbedPaneView = this.getTabbedPaneTable();

	this.container.appendChild(this.tabbedPaneView);
}
JSTabbedPane.prototype.getControllerTable=function(){
	
	var controllerViewTmp = document.createElement('table');
	
	controllerViewTmp.border = 0;
	controllerViewTmp.cellPadding = 0 ;
	controllerViewTmp.cellSpacing = 0 ;
	
	var row = controllerViewTmp.insertRow();
	var isFirst = true ;
	var iterator = this.panelsList.iterator();
	while (iterator.hasNext()) {
		var next = iterator.next();
		var cell = row.insertCell();
		cell.innerHTML = next.getLabel() ;
		cell.onclick = this.onTabChange ;
		cell.reference = this ;
		cell.panel = next ;
		cell.className = JSTabbedPane.normalLabelStyle ;
		if(isFirst){
			this.selectedController = cell ;
			isFirst = false ;
		}
	}
	var controllerViewDivTmp = document.createElement('div');
	controllerViewDivTmp.style.overflow = 'hidden';
	controllerViewDivTmp.style.width = '380px';
	
	controllerViewDivTmp.appendChild(controllerViewTmp);
	
	return controllerViewDivTmp ;
}
JSTabbedPane.prototype.getContainerTable=function(){
	
	var containerViewTmp  = document.createElement('table');
	
	containerViewTmp.cellPadding = 0 ;
	containerViewTmp.cellSpacing = 0 ;
	
	
	containerViewTmp.border = 0;
	containerViewTmp.width = '300px';
	containerViewTmp.height = '400px';
	var cell = containerViewTmp.insertRow().insertCell();
	cell.className = JSTabbedPane.containerStyle  ;
	
	
	return containerViewTmp ;
}

JSTabbedPane.prototype.getTabbedPaneTable=function(){
	
	var tabbedPaneViewTmp = document.createElement('table');
	tabbedPaneViewTmp.width = '400px';
	tabbedPaneViewTmp.cellPadding = 0 ;
	tabbedPaneViewTmp.cellSpacing = 0 ;
	
	var aRow = tabbedPaneViewTmp.insertRow();
	var cellController = aRow.insertCell();
	cellController.className = JSTabbedPane.controllerStyle ;
	
	this.controllerView = this.getControllerTable();
	cellController.appendChild(this.controllerView);
	
	var cellScroller = aRow.insertCell();
	
	this.scrollerControllerView = this.getScrollerTable();
	cellScroller.appendChild(this.scrollerControllerView);
	
	aRow = tabbedPaneViewTmp.insertRow();
	var cellContainer = aRow.insertCell();
	cellContainer.colSpan = 2;
	cellContainer.width = '100%';
	cellContainer.height = '400px';
	this.containerView = cellContainer;

	if(this.selectedController){
		this.containerView.innerHTML = this.selectedController.panel.getContent() ;
		this.selectedController.className = JSTabbedPane.selectedLabelStyle ;
	}
	this.containerView.className = JSTabbedPane.containerStyle  ;
	//cellContainer.appendChild(this.containerView);
	
	return tabbedPaneViewTmp ;
}

JSTabbedPane.prototype.getScrollerTable=function(){
	var scrollerViewTmp = document.createElement('table');
	scrollerViewTmp.style.backgroundColor='gray' ;
	//scrollerViewTmp.height = '100%'
	//scrollerViewTmp.width = '100%'
	scrollerViewTmp.cellPadding = 0 ;
	scrollerViewTmp.cellSpacing = 0 ;
	
	var imgBack = document.createElement('img');
	imgBack.src = baseURL+"images/tab/back.jpg" ;
	imgBack.height = 21 ;
	
	var imgForward = document.createElement('img');
	imgForward.src = baseURL+"images/tab/forward.jpg" ;
	imgForward.height = 21 ;
	
	var r1 = scrollerViewTmp.insertRow();
	var c1 = r1.insertCell();
	c1.appendChild(imgBack);
	imgBack.onclick = this.scrollerLeft ;
	imgBack.reference = this ;
	var c2 = r1.insertCell();
	c2.appendChild(imgForward);
	imgForward.onclick = this.scrollerRight ;
	imgForward.reference = this ;
	
	return scrollerViewTmp ;
}

JSTabbedPane.prototype.scrollerLeft=function(){
	this.reference.controllerView.scrollLeft=this.reference.controllerView.scrollLeft-100;
}

JSTabbedPane.prototype.scrollerRight=function(){
	this.reference.controllerView.scrollLeft=this.reference.controllerView.scrollLeft+100;
}
JSTabbedPane.prototype.onTabChange=function(){
	if(this.reference.selectedController){
		this.reference.selectedController.className = JSTabbedPane.normalLabelStyle;
	}
	this.reference.selectedController = event.srcElement ;
	this.reference.containerView.innerHTML = this.reference.selectedController.panel.getContent() ;
	this.reference.selectedController.className = JSTabbedPane.selectedLabelStyle ;
}

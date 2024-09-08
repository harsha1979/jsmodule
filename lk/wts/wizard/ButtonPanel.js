document.write("<script src='http://localhost/wtsteam/wizard/Wizard.js' language='javascript' type='text/javascript'></script>");

function ButtonPanel(width,height,wizard){
  	//alert("start ButtonPanel");
	this.type="ButtonPanel";	
  	this.container = new Container();
	this.container.setHeight(height);
	this.container.setWidth(width);
	this.wizard = wizard; //Associated wizard object 
  	//Creating the grid for the Bottom Pane
 	this.layout = new GridLayout(1,4);

  	this.btnPrev   = document.createElement("<Input type='button' value='Prev'   >");
  	this.btnNext   = document.createElement("<Input type='button' value='Next'   >");
  	this.btnFinish = document.createElement("<Input type='button' value='Finish' >");
  	this.btnSave   = document.createElement("<Input type='button' value='Save'   >");

  	//to work with the event handler on the wizard
	this.btnPrev.wizard=this.wizard;
	this.btnNext.wizard=this.wizard;
	this.btnFinish.wizard=this.wizard;
	this.btnSave.wizard=this.wizard;

	//register events of the wizard
	this.btnPrev.onclick   = this.wizard.showPreviousPanel;  
	this.btnNext.onclick   = this.wizard.showNextPanel;
	this.btnSave.onclick   = this.wizard.savePanel;
	this.btnFinish.onclick = this.wizard.finishWizard;

  	this.layout.add(0,0,this.btnNext);
  	this.layout.add(0,1,this.btnPrev);
  	this.layout.add(0,2,this.btnFinish);
  	this.layout.add(0,3,this.btnSave);
                
  	this.container.setLayout(this.layout);
}

ButtonPanel.prototype.getButtonPanel = function(){	
	return this.container.getContentPane();
}

ButtonPanel.prototype.getPanelHeight = function(){	
	return this.container.getHeight();
}

ButtonPanel.prototype.setPanelHeight = function(height){	
	return this.container.setHeight(height);
}

ButtonPanel.prototype.getPanelWidth = function(){	
	return this.container.getWidth();
}

ButtonPanel.prototype.setPanelWidth = function(width){	
	return this.container.setWidth(width);
}

ButtonPanel.prototype.getPanelLayout = function(){	
	return this.container.getLayout();
}

ButtonPanel.prototype.setPanelLayout = function(layout){	
	return this.container.setLayout(layout);
}

//Accessors for the buttons
ButtonPanel.prototype.getBtnNext = function(){	
	return this.btnNext;
}

ButtonPanel.prototype.setBtnNext = function(btnNext){	
	this.btnNext = btnNext;
}

ButtonPanel.prototype.getBtnPrev = function(){	
	return this.btnPrev;
}

ButtonPanel.prototype.setBtnPrev = function(btnPrev){	
	this.btnPrev = btnPrev;
}

ButtonPanel.prototype.getBtnFinish = function(){	
	return this.btnFinish;
}

ButtonPanel.prototype.setBtnFinish = function(btnFinish){	
	this.btnFinish = btnFinish;
}

ButtonPanel.prototype.getBtnSave = function(){	
	return this.btnSave;
}

ButtonPanel.prototype.setBtnSave = function(btnSave){	
	this.btnSave = btnSave;
}


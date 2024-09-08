wts.using("lk.wts.util.DateUtil;");
wts.using("lk.wts.util.SimpleDateFormat;");

function DateChooser(dateField,dateFormat){
	
	this.dateField=dateField;
	this.dateFormat="dd/MMM/yyyy";
	if(dateFormat){
		this.dateFormat=dateFormat;
	}
	this.init();
	this.datePickerDivID="datePickerDivID"
	this.dateChooserMonthDivID="dateChooserMonthDivID"
	this.dateChooserYearDivID="dateChooserYearDivID"
	var sdf=new SimpleDateFormat(this.dateFormat);
	if(window['todayValue']){
		this.toDayDate=sdf.parse(todayValue);
	}else{
		this.toDayDate=new Date();
	}	
	this.selectedDate=this.toDayDate;	
}

DateChooser.prototype.init= function (){
	this.img=document.createElement("img");
	this.img.src=baseURL+'images/datechooser/calendar.gif';
	this.img.parent=this;
	this.img.onclick=this.onImgClick;	
	this.img.style.width="21px";
	this.img.style.height="20px";
	//this.img.border=1;
	
	var tempTable=document.createElement("<table border='0'  width='100%' cellpadding='0' cellspacing='0' >");
	var aRow=tempTable.insertRow();
	var firstCell=aRow.insertCell();
	var secondCell=aRow.insertCell();
	secondCell.appendChild(this.img);
	this.getHTMLComponent().insertAdjacentElement("afterEnd",tempTable);
		
	firstCell.appendChild(this.getHTMLComponent().removeNode());
	
}
DateChooser.prototype.getHTMLComponent= function (aDate){
	var htmlComp=this.dateField;
	if(this.dateField.type && this.dateField.type=="MaskDateField"){
		htmlComp=this.dateField.getField();
	}
	return htmlComp;	
}
DateChooser.prototype.updateDateField= function (aDate){
	
	this.selectedDate=aDate;
	if(this.dateField.type && this.dateField.type=="MaskDateField"){
		this.dateField.setDate(aDate);
	}else{
		var sdf=new SimpleDateFormat(this.dateFormat);
		this.dateField.value=sdf.format(aDate);
	}
}
DateChooser.prototype.getFieldDate= function (){
	
	var aDate=this.toDayDate;
	if(this.dateField.type && this.dateField.type=="MaskDateField"){
		aDate=this.dateField.getDate();
	}else{
		var sdf=new SimpleDateFormat(this.dateFormat);
		aDate=sdf.parse(this.dateField.value);
	}
	return aDate;
}



DateChooser.prototype.onImgClick=function(){	
	this.parent.drawChooser();
}

DateChooser.prototype.onClose=function(){
	var pickerDiv=null;	
	if(this.dateChooser){		
		pickerDiv = document.getElementById(this.dateChooser.datePickerDivID);	
		this.dateChooser.refreshPopups();	
	}else{		
		pickerDiv=document.getElementById(this.datePickerDivID);	
		this.refreshPopups();	
	}
	pickerDiv.style.position = "absolute";	
	pickerDiv.style.visibility = "hidden";
	pickerDiv.style.zIndex = 10000;
	
}
DateChooser.prototype.refreshPopups=function(){
	
	var yearDiv=null;
	var monthDiv=null;
	if(this.dateChooser){		
		yearDiv = document.getElementById(this.dateChooser.dateChooserYearDivID);		
		monthDiv = document.getElementById(this.dateChooser.dateChooserMonthDivID);
	}else{			
		yearDiv = document.getElementById(this.dateChooserYearDivID);
		monthDiv = document.getElementById(this.dateChooserMonthDivID);
	}	
	if(yearDiv){
		yearDiv.style.visibility = "hidden";
	}
	if(monthDiv){
		monthDiv.style.visibility = "hidden";	
	}
}


DateChooser.prototype.drawChooser= function (fromDate){
	
	wts.debug("from Date"+fromDate);
	if(!fromDate){
		
		this.selectedDate=this.getFieldDate();
		fromDate=this.selectedDate;
		//wts.debug("this.selectedDate"+this.selectedDate);
	}
	this.selectedDate=fromDate;
	wts.debug("from Date"+fromDate);
	
	this.dateTable=document.createElement("<table border='0'  cellpadding='0' cellspacing='0' class='dateChooser_dateTable'>");
	//this.dateTable.background=baseURL+"images/datechooser/2_1.jpg";
	var topRow=this.dateTable.insertRow();
	
	var navigationTable=document.createElement("<table border='0'  width='100%' cellpadding='0' cellspacing='1' class='dateChooser_navigation'>");
	this.createTopBar(navigationTable,fromDate);
	topRow.insertCell().appendChild(navigationTable);
	
	var centerRow=this.dateTable.insertRow();
	var calendarTable=document.createElement("<table border='0'  cellpadding='0' cellspacing='0'>");
	centerRow.insertCell().appendChild(calendarTable);
	var bottomRow=this.dateTable.insertRow();
	//var bottomTable=document.createElement("<table border='0'  cellpadding='0' cellspacing='0'>");
	//var closeButton=document.createElement("button");
	//closeButton.innerText="Close";
	var bottomCell=bottomRow.insertCell();
	//bottomCell.appendChild(closeButton);
	bottomCell.className="dateChooser_bottomCell";
	var sdf=new SimpleDateFormat("EEE. dd.MMM yyyy");
	
	bottomCell.innerText=sdf.format(this.toDayDate);
	
	this.populateTable(calendarTable,fromDate,this);
	
	var displayBelowThisObject=this.getHTMLComponent();
	var x = displayBelowThisObject.offsetLeft;
	var y = displayBelowThisObject.offsetTop + displayBelowThisObject.offsetHeight;
	
	var parent = displayBelowThisObject;
	while (parent.offsetParent) {
		parent = parent.offsetParent;
		x += parent.offsetLeft;
		y += parent.offsetTop;
	}
	
	if (!document.getElementById(this.datePickerDivID)) {		
		var newNode = document.createElement("div");
		newNode.setAttribute("id", this.datePickerDivID);
		newNode.setAttribute("class", "dpDiv");
		newNode.setAttribute("style", "visibility: hidden;");
		document.body.appendChild(newNode);
	}	
	var pickerDiv = document.getElementById(this.datePickerDivID);
	pickerDiv.style.position = "absolute";
	pickerDiv.style.left = x + "px";
	pickerDiv.style.top = y + "px";
	pickerDiv.style.visibility = "visible";
	pickerDiv.style.zIndex = 10000;
	
	
	if(pickerDiv.firstChild){
  		pickerDiv.replaceChild(this.dateTable,pickerDiv.firstChild);
	}else{
  		pickerDiv.insertAdjacentElement("afterBegin",this.dateTable);
	}	
}


DateChooser.prototype.createTopBar=function (aTable,aDate){
	
	var aRow=aTable.insertRow();	
	this.prevTD=aRow.insertCell();
	this.prevTD.width="16px";
	//this.prevTD.innerHTML="&nbsp;";	
	var leftImg=document.createElement("img");	
	leftImg.src=baseURL+"images/datechooser/left.gif";
	this.prevTD.appendChild(leftImg);
	leftImg.onclick=this.showPrev;
	leftImg.dateChooser=this;
	
	
	this.nextTD=aRow.insertCell();	
	this.nextTD.width="16px";
	var rightImg=document.createElement("img");
	rightImg.src=baseURL+"images/datechooser/right.gif";
	rightImg.dateChooser=this;	
	rightImg.onclick=this.showNext;
	this.nextTD.appendChild(rightImg);	
	
	
	//this.nextTD.innerHTML="&nbsp;";
	
	this.monthTD=aRow.insertCell();		
	var monthArrayLong = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	
	this.monthTD.innerText=monthArrayLong[aDate.getMonth()];
	this.monthTD.monthNo=aDate.getMonth();
	this.monthTD.width='50px';
	this.monthTD.className='dateChooser_month';
	this.monthTD.align="center";	
	
	this.monthTDDown=aRow.insertCell();	
	var downImg2=document.createElement("img");
	downImg2.src=baseURL+"images/datechooser/down.gif";
	downImg2.dateChooser=this;
	downImg2.onclick=this.showMonths;	
	this.monthTDDown.appendChild(downImg2);	
	
	
	
	
	this.yearTD=aRow.insertCell();	
	this.yearTD.width='27px';
	this.yearTD.className='dateChooser_year';	
	this.yearTD.innerText=aDate.getFullYear();
	this.yearTD.yearNo=aDate.getFullYear();
	this.yearTD.align="center";	
	
	this.yearTDDown=aRow.insertCell();	
	var downImg1=document.createElement("img");	
	downImg1.src=baseURL+"images/datechooser/down.gif";	
	downImg1.dateChooser=this;
	downImg1.onclick=this.showYear;	
	this.yearTDDown.appendChild(downImg1);	
	//this.yearTD.innerHTML="&nbsp;";
		
	
	//this.monthTD.innerHTML="&nbsp;";
	
	this.closeTD=aRow.insertCell();	
	this.closeTD.width="16px";
	this.closeTD.align="right";
	var closeImg=document.createElement("img");
	closeImg.src=baseURL+"images/datechooser/close.gif";
	closeImg.onclick=this.onClose;
	closeImg.dateChooser=this;
	this.closeTD.appendChild(closeImg);
	//this.closeTD.innerHTML="&nbsp;";
	
}

DateChooser.prototype.showPrev=function (){
	this.dateChooser.refreshPopups();
	this.dateChooser.selectedDate.setMonth(this.dateChooser.selectedDate.getMonth()-1);
	this.dateChooser.drawChooser(this.dateChooser.selectedDate);
}
DateChooser.prototype.showNext=function (){
	this.dateChooser.refreshPopups();
	this.dateChooser.selectedDate.setMonth(this.dateChooser.selectedDate.getMonth()+1);
	this.dateChooser.drawChooser(this.dateChooser.selectedDate);
}
DateChooser.prototype.showYear=function (){
	this.dateChooser.refreshPopups();
	var displayBelowThisObject=this;
	var x = displayBelowThisObject.offsetLeft;
	var y = displayBelowThisObject.offsetTop + displayBelowThisObject.offsetHeight;
	
	var parent = displayBelowThisObject;
	while (parent.offsetParent) {
		parent = parent.offsetParent;
		x += parent.offsetLeft;
		y += parent.offsetTop;
	}
	
	var months=document.createElement("<table border='0'  width='30px' cellpadding='0' cellspacing='0' class='dateChooser_yearSelectData'>")
	
	//var monthArrayLong = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	
	function doOnYearSelect(){
		window.event.cancelBubble=true;		
		this.dateChooser.yearTD.innerText=this.innerText;
		var pickerDiv = document.getElementById(this.dateChooser.dateChooserYearDivID);
		pickerDiv.style.visibility = "hidden";		
		var aDate=new Date();
		if(aDate.getDate()>28){
			aDate.setDate(1);	
		}
		aDate.setMonth(this.dateChooser.monthTD.monthNo);		
		aDate.setFullYear(this.yearNo);			
		this.dateChooser.drawChooser(aDate);			
	}
	
	for(var i=2005;i<2015;i++){
		var aRow=months.insertRow();
		var aTD=aRow.insertCell();		
		aTD.innerText=i;
		aTD.dateChooser=this.dateChooser;
		aTD.onclick=doOnYearSelect;
		aTD.yearNo=i;
	}
	
	
	if (!document.getElementById(this.dateChooser.dateChooserYearDivID)) {		
		var newNode = document.createElement("div");
		newNode.setAttribute("id", this.dateChooser.dateChooserYearDivID);
		newNode.setAttribute("class", "dateChooser_monthSelectDIV");
		newNode.setAttribute("style", "visibility: hidden;");
		document.body.appendChild(newNode);
	}
	
	
	var pickerDiv = document.getElementById(this.dateChooser.dateChooserYearDivID);
	pickerDiv.style.position = "absolute";
	pickerDiv.style.left = (x-30) + "px";
	pickerDiv.style.top = y + "px";
	pickerDiv.style.visibility =  "visible" ;
	pickerDiv.style.zIndex = 10000;
	
	
	if(pickerDiv.firstChild){
  		pickerDiv.replaceChild(months,pickerDiv.firstChild);
	}else{
  		pickerDiv.insertAdjacentElement("afterBegin",months);
	}	
}

DateChooser.prototype.showMonths=function (){
		
	this.dateChooser.refreshPopups();
	var displayBelowThisObject=this;
	var x = displayBelowThisObject.offsetLeft;
	var y = displayBelowThisObject.offsetTop + displayBelowThisObject.offsetHeight;
	
	var parent = displayBelowThisObject;
	while (parent.offsetParent) {
		parent = parent.offsetParent;
		x += parent.offsetLeft;
		y += parent.offsetTop;
	}
	
	var months=document.createElement("<table border='0' width='53px'  cellpadding='0' cellspacing='0' class='dateChooser_monthSelectData'>")
	
	var monthArrayLong = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	
	function doOnMonthSelect(){
		window.event.cancelBubble=true;		
		this.dateChooser.monthTD.innerText=this.innerText;
		this.dateChooser.monthTD.monthNo=this.monthNo;
		var pickerDiv = document.getElementById(this.dateChooser.dateChooserMonthDivID);
		pickerDiv.style.visibility = "hidden";		
		var aDate=new Date();
		if(aDate.getDate()>28){
			aDate.setDate(1);	
		}
		aDate.setMonth(this.monthNo);	
		aDate.setFullYear(this.dateChooser.yearTD.yearNo);
		this.dateChooser.drawChooser(aDate);		
	}
	
	for(var i=0;i<monthArrayLong.length;i++){
		var aRow=months.insertRow();
		var aTD=aRow.insertCell();		
		aTD.innerText=monthArrayLong[i];
		aTD.dateChooser=this.dateChooser;
		aTD.onclick=doOnMonthSelect;
		aTD.monthNo=i;
	}
	
	
	if (!document.getElementById(this.dateChooser.dateChooserMonthDivID)) {		
		var newNode = document.createElement("div");
		newNode.setAttribute("id", this.dateChooser.dateChooserMonthDivID);
		newNode.setAttribute("class", "dateChooser_monthSelectDIV");
		newNode.setAttribute("style", "visibility: hidden;");
		document.body.appendChild(newNode);
	}
	
	
	var pickerDiv = document.getElementById(this.dateChooser.dateChooserMonthDivID);
	pickerDiv.style.position = "absolute";
	pickerDiv.style.left = (x-53) + "px";
	pickerDiv.style.top = y + "px";
	pickerDiv.style.visibility =  "visible" ;
	pickerDiv.style.zIndex = 10000;
	
	
	if(pickerDiv.firstChild){
  		pickerDiv.replaceChild(months,pickerDiv.firstChild);
	}else{
  		pickerDiv.insertAdjacentElement("afterBegin",months);
	}	
}

DateChooser.prototype.populateTable=function (aTable,aDate,dateChooser){
	
		var dayArrayShort = new Array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');
		var widthText="17px";
		var lblRow=aTable.insertRow(0);
		for(var i=0;i<dayArrayShort.length;i++){
			var dayLabel=lblRow.insertCell(i);
			dayLabel.innerText=dayArrayShort[i];	
			dayLabel.width=widthText;
			dayLabel.align='center';
			if(i==0 || i==6){
				dayLabel.className="dateChooser_dayLabelHoliday";
			}else{
				dayLabel.className="dateChooser_dayLabel";
			}
		}
		
		var tempDate=new Date(aDate.getTime());
		tempDate.setDate(1);
		var firstLine=aTable.insertRow(1);
		for(var i=0;i<tempDate.getDay();i++){
			var dayLabel=firstLine.insertCell(i);
			dayLabel.innerHTML="&nbsp;";
			dayLabel.width=widthText;	
			dayLabel.className="dateChooser_blank";
		}
		for(var i=tempDate.getDay();i<7;i++){
			var dayLabel=firstLine.insertCell(i);
			
			//dayLabel.onclick=dateChooser.onDateSelect;
			//dayLabel.dateChooser=dateChooser;
			
			this.buildLabel(tempDate,dayLabel,dateChooser);
			//dayLabel.appendChild(aLabel);
			/*
			dayLabel.innerText=tempDate.getDate();	
			dayLabel.align='right';
			dayLabel.width=widthText;
			if(i==0 || i==6){
				dayLabel.className="dateChooser_dateHoliday";
			}else{
				dayLabel.className="dateChooser_date";
			}		
			*/	
			tempDate.setDate(tempDate.getDate()+1);
		}
		
		//tempDate.setDate(8-tempDate.getDay());
		var count=0;
		var dateRow=null;
		while(aDate.getMonth()==tempDate.getMonth()){
			if(count%7==0){
				dateRow=aTable.insertRow();
				count=0;
			}
			count++;
			var dayLabel=dateRow.insertCell();
			
			this.buildLabel(tempDate,dayLabel,dateChooser);
			//dayLabel.appendChild(aLabel);
			
			/*
			dayLabel.innerText=tempDate.getDate();	
			dayLabel.align='right';
			if(count==1 || count==7){
				dayLabel.className="dateChooser_dateHoliday";
			}else{
				dayLabel.className="dateChooser_date";
			}
			dayLabel.width=widthText;
			
			*/
			tempDate.setDate(tempDate.getDate()+1);
		}
		for(var i=count;i<7;i++){
			var dayLabel=dateRow.insertCell();			
			dayLabel.innerHTML="&nbsp;";	
			dayLabel.width=widthText;
			dayLabel.className="dateChooser_blank";
		}		
			
}

DateChooser.prototype.buildLabel=function (aDate,aButton,dateChooser){
	
	var sdf=new SimpleDateFormat("dd");
	//var aButton=document.createElement("button");
	
	aButton.innerText=sdf.format(aDate);
	var tempDate=new Date();
	tempDate.setTime(aDate.getTime());
	aButton.theDate=tempDate;
	aButton.parentChooser=this;
	aButton.onclick=this.onDateSelect
	var i=aDate.getDate();
	if(DateUtil.prototype.compareDates(dateChooser.selectedDate,aDate)!=0){
		if(i%7==5 || i%7==6){
			aButton.className="dateChooser_dateHoliday";
		}else{
			aButton.className="dateChooser_date";
		}	
	}else{
		aButton.className="dateChooser_selectedDate";
	}
	//return aButton;
}

DateChooser.prototype.onDateSelect=function (){
	//d
	var sdf=new SimpleDateFormat(this.parentChooser.dateFormat);
	var leftBoundry=null;
	if(this.parentChooser.minValue){
		leftBoundry=this.parentChooser.minValue;
	}else{
		if(this.parentChooser.leftBoundryField){
			if(this.parentChooser.leftBoundryField.value!=""){				
				leftBoundry=sdf.parse(this.parentChooser.leftBoundryField.value);
			}			
		}
	}	
	if(leftBoundry && DateUtil.prototype.compareDates(leftBoundry,this.theDate)>0){
		alert("Please enter a date that is "+sdf.format(leftBoundry)+" or later");
		return;
	}
	
	var rightBoundry=null;
	if(this.parentChooser.maxValue){
		rightBoundry=this.parentChooser.maxValue;
	}else{
		if(this.parentChooser.rightBoundryField){
			if(this.parentChooser.rightBoundryField.value!=""){				
				rightBoundry=sdf.parse(this.parentChooser.rightBoundryField.value);
			}			
		}
	}	
	if(rightBoundry && DateUtil.prototype.compareDates(rightBoundry,this.theDate)<0){
		alert("Please enter a date that is "+sdf.format(rightBoundry)+" or before");
		return;
	}	
	this.parentChooser.updateDateField(this.theDate);	
	this.parentChooser.selectedDate=this.theDate;
	this.parentChooser.onClose();
	wts.debug(this.theDate);
}

DateChooser.prototype.setMinValue=function (minValue){/* this should be a date object*/
	this.minValue=minValue;
}
DateChooser.prototype.setLeftBoundryField=function (leftBoundryField){/* this should be a input type text*/
	this.leftBoundryField=leftBoundryField;
}
DateChooser.prototype.setMaxValue=function (maxValue){/* this should be a date object*/
	this.maxValue=maxValue;
}
DateChooser.prototype.setRightBoundryField=function (rightBoundryField){/* this should be a input type text*/
	this.rightBoundryField=rightBoundryField;
}
	
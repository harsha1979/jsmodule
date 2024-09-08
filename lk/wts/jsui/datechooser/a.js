


function DatePicker(frmDate1,toDate1) {

var datePickerDivID = "datepicker";
var iFrameDivID = "datepickeriframe";

var dayArrayShort = new Array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');
var dayArrayMed = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var dayArrayLong = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var monthArrayShort = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
var monthArrayMed = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec');
var monthArrayLong = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// these variables define the date formatting we're expecting and outputting.
// If you want to use a different format by default, change the defaultDateSeparator
// and defaultDateFormat variables either here or on your HTML page.
var defaultDateSeparator = "/";		// common values would be "/" or "."
var defaultDateFormat = "dmy";	// valid values are "mdy", "dmy", and "ymd"
var dateSeparator = defaultDateSeparator;
var dateFormat = defaultDateFormat;

var displayBelowThisObject;//,
var dtFormat;
var dtSep;


if(frmDate1){
	//alert("from "+frmDate1.value);
}
if(toDate1){
	//alert("to "+toDate1.value);
}
 
var mDateFrom = frmDate1 ;
var mDateTo = toDate1 ;



this.displayDatePicker = displayDatePicker;
this.drawDatePicker = drawDatePicker;
this.getFieldDate = getFieldDate;
this.adjustiFrame = adjustiFrame;
this.datePickerClosed = datePickerClosed;
this.updateDateField = updateDateField;
this.getDateString = getDateString;
this.setMainDateFrom = setMainDateFrom;
this.setMainDateTo = setMainDateTo;
//ADDED ON 13/12/2007
this.compareDates = compareDates;

function displayDatePicker(dateFieldName,startDateName,endDateName) {
//alert("dateFieldName,startDateName,endDateName" + dateFieldName + "--"+ startDateName + "--"+ endDateName);
	var targetDateField = document.getElementsByName(dateFieldName).item(0);
	//alert(dateFieldName+" jjjj "+document.getElementsByName(dateFieldName).length);

	// if we weren't told what node to display the datepicker beneath, just display it
	// beneath the date field we're updating
	//if (!displayBelowThisObject)
	displayBelowThisObject = targetDateField;

	// if a date separator character was given, update the dateSeparator variable

	if (dtSep)
		dateSeparator = dtSep;
	else
		dateSeparator = defaultDateSeparator;

	// if a date format was given, update the dateFormat variable
	if (dtFormat)
		dateFormat = dtFormat;
	else
		dateFormat = defaultDateFormat;
	var x = displayBelowThisObject.offsetLeft;
	var y = displayBelowThisObject.offsetTop + displayBelowThisObject.offsetHeight;
	// deal with elements inside tables and such
	var parent = displayBelowThisObject;
	while (parent.offsetParent) {
		parent = parent.offsetParent;
		x += parent.offsetLeft;
		y += parent.offsetTop;
	}

	
	drawDatePicker(targetDateField, x, y,startDateName,endDateName);
}




/**
Draw the datepicker object (which is just a table with calendar elements) at the
specified x and y coordinates, using the targetDateField object as the input tag
that will ultimately be populated with a date.

This function will normally be called by the displayDatePicker function.
*/

function drawDatePicker(targetDateField, x, y,startDateName,endDateName) {

	var dt = getFieldDate(targetDateField.value);

	// the datepicker table will be drawn inside of a <div> with an ID defined by the
	// global datePickerDivID variable. If such a div doesn't yet exist on the HTML
	// document we're working with, add one.
	if (!document.getElementById(datePickerDivID)) {
		// don't use innerHTML to update the body, because it can cause global variables
		// that are currently pointing to objects on the page to have bad references
		//document.body.innerHTML += "<div id='" + datePickerDivID + "' class='dpDiv'></div>";
		var newNode = document.createElement("div");
		newNode.setAttribute("id", datePickerDivID);
		newNode.setAttribute("class", "dpDiv");
		newNode.setAttribute("style", "visibility: hidden;");
		document.body.appendChild(newNode);
	}

	// move the datepicker div to the proper x,y coordinate and toggle the visiblity
	var pickerDiv = document.getElementById(datePickerDivID);
	pickerDiv.style.position = "absolute";
	pickerDiv.style.left = x + "px";
	pickerDiv.style.top = y + "px";
	pickerDiv.style.visibility = (pickerDiv.style.visibility == "visible" ? "hidden" : "visible");
	pickerDiv.style.zIndex = 10000;

	// draw the datepicker table

	refreshDatePicker(targetDateField.name, dt.getFullYear(), dt.getMonth(), dt.getDate(),startDateName,endDateName);
}

//**************************************************************************************************8

function getButtonCode1(dateFieldName, dateVal, adjust, label,startDateName,endDateName) {
  	var newMonth = (dateVal.getMonth() + adjust) % 12;
  	var newYear = dateVal.getFullYear() + parseInt((dateVal.getMonth() + adjust) / 12);
  	if (newMonth < 0) {
    	newMonth += 12;
    	newYear += -1;
  	}
  	var btn = document.createElement("button");
  	btn.attachEvent("onclick", refreshDatePickerTmp);
  	btn.value = label;
  	btn.dateFieldName =   dateFieldName  ;
  	btn.newYear = newYear;
  	btn.newMonth = newMonth;
  	btn.newday = dateVal.getDay();
  	btn.startDateName =  startDateName ;
  	btn.endDateName =  endDateName ;

		btn.className = 'dpButton';
		return btn;

}

var parent1 = this;
function refreshDatePickerTmp(){
	var obj=window.event.srcElement;	
	
	refreshDatePicker(obj.dateFieldName,obj.newYear,obj.newMonth,obj.newday,obj.startDateName ,obj.endDateName);
}

function updateDateFieldTmp(){

	var obj=window.event.srcElement;	
	if(obj.mFlag != "true") {
		obj = obj.parentElement;		
	}
	if(obj.dateFieldName)
		updateDateField(obj.dateFieldName , obj.thisDay , obj.startDateName, obj.endDateName);
}


function refreshDatePicker(dateFieldName, year, month, day,startDateName,endDateName){
//alert("aaaa");
	var thisDay = new Date();

  if ((month >= 0) && (year > 0)) {
	 	thisDay = new Date(year, month, 1);
  } else {
   	day = thisDay.getDate();
   	thisDay.setDate(1);
  }

	var tbl = document.createElement("Table");
	tbl.cols = 7;
	tbl.className='dpTable';

	var r1 = tbl.insertRow(0);

	var r1c1 = r1.insertCell(0);
	r1c1.className = 'dpButtonTD';

	r1c1.insertAdjacentElement("afterBegin", getButtonCode1(dateFieldName, thisDay, -1, "&lt;",startDateName,endDateName));

	var r1c2 = r1.insertCell(1);
	r1c2.colSpan = 5;
	r1c2.className = 'dpTitleTD';
	var DIV_title = document.createElement("div");

	DIV_title.insertAdjacentText("afterBegin",monthArrayLong[thisDay.getMonth()] + " " + thisDay.getFullYear());
	r1c2.insertAdjacentElement("afterBegin",DIV_title);


	var r1c3 = r1.insertCell(2);
	r1c3.className = 'dpButtonTD';
	r1c3.insertAdjacentElement("afterBegin", getButtonCode1(dateFieldName, thisDay, 1, "&gt;", startDateName, endDateName));

	var r2 = tbl.insertRow(1);
  for(i = 0; i < dayArrayShort.length; i++) {
		var r2c1 = r2.insertCell(i);
		r2c1.innerHTML = dayArrayShort[i];
		r2c1.className = 'dpDayTD';
  }

	var r3 = tbl.insertRow(2);

	for (i = 0; i < thisDay.getDay(); i++) {
		var r3c1 = r3.insertCell(i);
		r3c1.innerHTML =  "&nbsp;";
		r3c1.className = 'dpTD';
	}

	var tdc = thisDay.getDay();
	var trc = 3;
  	do {
    	dayNum = thisDay.getDate();

    	if (dayNum == day) {
    		var r3c1 = r3.insertCell(tdc);
				r3c1.className = 'dpDayHighlightTD';
				r3c1.attachEvent("onclick", updateDateFieldTmp);
				r3c1.dateFieldName = dateFieldName;
				r3c1.thisDay = getDateString(thisDay);
				r3c1.startDateName = startDateName;
				r3c1.endDateName = endDateName;

				var DIV_selected = document.createElement("div");
				DIV_selected.className = 'dpDayHighlight';
				r3c1.insertAdjacentElement("afterBegin",DIV_selected);
				DIV_selected.insertAdjacentText("afterBegin",dayNum);

    	} else {
    		var r3c2 = r3.insertCell(tdc);
				r3c2.className = 'dpTD';
				r3c2.mFlag = "true";
				r3c2.attachEvent("onclick", updateDateFieldTmp);
				r3c2.innerHTML =  dayNum ;
				r3c2.dateFieldName = dateFieldName;
				r3c2.thisDay = getDateString(thisDay);
				r3c2.startDateName = startDateName;
				r3c2.endDateName = endDateName;
    	}


    	// if this is a Saturday, start a new row
    	if (thisDay.getDay() == 6) {

      		var r3 = tbl.insertRow(trc);
      		trc = trc + 1;
      		tdc = -1;
      }

    	// increment the day
    	thisDay.setDate(thisDay.getDate() + 1);
    	tdc = tdc +1;
  	} while (thisDay.getDate() > 1)



  	// add a button to allow the user to easily return to today, or close the calendar
  	var today = new Date();
  	var todayString = "Today is " + dayArrayMed[today.getDay()] + ", " + monthArrayMed[today.getMonth()] + " " + today.getDate();
  	
  	var lr = tbl.insertRow();
  	lr.className = 'dpTodayButtonTR';
  	var lrc = lr.insertCell();
  	lrc.colSpan = 7; 
  	lrc.className = 'dpTodayButtonTD';
  	
  	
  	var thisMon = document.createElement("button");
  	
  	//COMMENT ON 13/12/2007
  	thisMon.attachEvent("onclick", refreshDatePickerTmp);
  	thisMon.value = "This Month";
  	thisMon.className = 'dpTodayButton';  	

		//COMMENT ON 13/12/2007
  	thisMon.dateFieldName =   dateFieldName  ;
		thisMon.startDateName =  startDateName ;
  	thisMon.endDateName =  endDateName ;
		
		
  	var closB = document.createElement("button");
  	closB.attachEvent("onclick", updateDateFieldTmp);
  	closB.value = "Close";
  	closB.className = 'dpTodayButton'; 

  	closB.dateFieldName =  dateFieldName ; 
  	closB.startDateName =  startDateName ; 
  	closB.endDateName =  endDateName ; 
  	closB.thisDay = "";
		closB.mFlag = "true";

		lrc.insertAdjacentElement("afterBegin",closB);
		
  	lrc.insertAdjacentElement("afterBegin",thisMon);

		var tmp = document.getElementById(datePickerDivID);
		if(tmp.firstChild)
  		tmp.replaceChild(tbl,tmp.firstChild);
  	else
  		tmp.insertAdjacentElement("afterBegin",tbl);
		adjustiFrame(tmp,document.getElementById(iFrameDivID));

}

//********************************************************************************************************


/**
Convenience function for writing the code for the buttons that bring us back or forward
a month.
*/
function getButtonCode(dateFieldName, dateVal, adjust, label,startDateName,endDateName)
{
  var newMonth = (dateVal.getMonth() + adjust) % 12;
  var newYear = dateVal.getFullYear() + parseInt((dateVal.getMonth() + adjust) / 12);
  if (newMonth < 0) {
    newMonth += 12;
    newYear += -1;
  }
  return "<button class='dpButton' onClick='refreshDatePicker(\"" + dateFieldName + "\", " + newYear + ", " + newMonth + ","+dateVal.getDay()+",\""+startDateName+"\",\""+endDateName+"\");'>" + label + "</button>";

}


/**
Convert a JavaScript Date object to a string, based on the dateFormat and dateSeparator
variables at the beginning of this script library.
*/
function getDateString(dateVal)
{
  var dayString = "00" + dateVal.getDate();
  var monthString = "00" + (dateVal.getMonth()+1);
  dayString = dayString.substring(dayString.length - 2);
  monthString = monthString.substring(monthString.length - 2);	
	monthString=monthArrayShort[dateVal.getMonth()]
  switch (dateFormat) {
    case "dmy" :
      return dayString + dateSeparator + monthString + dateSeparator + dateVal.getFullYear();
    case "ymd" :
      return dateVal.getFullYear() + dateSeparator + monthString + dateSeparator + dayString;
    case "mdy" :
    default :
      return monthString + dateSeparator + dayString + dateSeparator + dateVal.getFullYear();
  }
}


/**
Convert a string to a JavaScript Date object.
*/
function getFieldDate(dateString)
{
  var dateVal;
  var dArray;
  var d, m, y;
//alert(dateString);
  try {
    dArray = splitDateString(dateString);
    if (dArray) {
      switch (dateFormat) {
        case "dmy" :
          d = parseInt(dArray[0], 10);
          m = getMonthValue(dArray[1]);
          y = parseInt(dArray[2], 10);
          break;
        case "ymd" :
          d = parseInt(dArray[2], 10);
          m = parseInt(dArray[1], 10) - 1;
          y = parseInt(dArray[0], 10);
          break;
        case "mdy" :
        default :
          d = parseInt(dArray[1], 10);
          m = parseInt(dArray[0], 10) - 1;
          y = parseInt(dArray[2], 10);
          break;
      }
      dateVal = new Date(y, m, d);
    } else {
      dateVal = new Date(dateString);
    }
    //alert(dateVal);
  } catch(e) {
  	alert("Invalid Date!\nPlease Enter dd/MMM/YYYY");
    dateVal = new Date();
  }

  return dateVal;
}

function getMonthValue(txtMonth){
	
	for(var i=0;i<monthArrayShort.length;i++){
		if(monthArrayShort[i].toUpperCase()==txtMonth.toUpperCase()){
			return i;
		}
	}
}


/**
Try to split a date string into an array of elements, using common date separators.
If the date is split, an array is returned; otherwise, we just return false.
*/
function splitDateString(dateString)
{
  var dArray;
  if (dateString.indexOf("/") >= 0)
    dArray = dateString.split("/");
  else if (dateString.indexOf(".") >= 0)
    dArray = dateString.split(".");
  else if (dateString.indexOf("-") >= 0)
    dArray = dateString.split("-");
  else if (dateString.indexOf("\\") >= 0)
    dArray = dateString.split("\\");
  else
    dArray = false;

  return dArray;
}

/*
Update the field with the given dateFieldName with the dateString that has been passed,
and hide the datepicker. If no dateString is passed, just close the datepicker without
changing the field value.

Also, if the page developer has defined a function called datePickerClosed anywhere on
the page or in an imported library, we will attempt to run that function with the updated
field as a parameter. This can be used for such things as date validation, setting default
values for related fields, etc. For example, you might have a function like this to validate
a start date field:
*/
function datePickerClosed(dateField,startDateName,endDateName)
{
	if(dateField.value){

		var dateObj = getFieldDate(dateField.value);
		var today = getFieldDate(dateToday);//new Date();
		
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		
		var tempDate=new Date();
		tempDate.setTime(today.getTime()+eval(dateStartFrom*24*60*60*1000));
		//alert(tempDate);
		if (dateField.name == startDateName) {

			if (compareDates(dateObj,tempDate)<0) {
				// if the date is before today, alert the user and display the datepicker again

				alert("Please enter a date that is "+getDateString(tempDate)+" or later");
				dateField.value = getDateString(tempDate);
				document.getElementById(datePickerDivID).style.visibility = "visible";
				adjustiFrame();
			}/* else {
				if(endDateName=="" || endDateName=='undefined'){

				}else{
					var dur=document.getElementById("duration");

					if( dur.value=="" ||  isNaN(dur.value) || eval(dur.value)<=0){
						dateObj.setTime(dateObj.getTime() + (1 * 24 * 60 * 60 * 1000));
					}else{
						dateObj.setTime(dateObj.getTime() + (eval(dur.value) * 24 * 60 * 60 * 1000));
					}


					var endDateField = document.getElementsByName(endDateName).item(0);
					endDateField.value = getDateString(dateObj);
				}

			}*/
		}
		

		if (dateField.name == endDateName) {		
			var startDateField = document.getElementsByName(startDateName).item(0);			
			var startdateObj = getFieldDate(startDateField.value);
			if (compareDates(dateObj,startdateObj)<0) {
				alert("Please enter a date that is After Checkin date");
				dateField.value = "";
				document.getElementById(datePickerDivID).style.visibility = "visible";
				adjustiFrame();
			} else {

				if (mDateTo != null) {

					if (compareDates(dateObj,getFieldDate(mDateTo.value))>0) {
						alert("Please enter a date (From :" +mDateFrom.value+" To :"+mDateTo.value+")");
						dateField.value = "";
						document.getElementById(datePickerDivID).style.visibility = "visible";
						adjustiFrame();
					}
				
				}
				
			}
		} else {		
			
			if (mDateFrom != null) {	
				
				if (compareDates(dateObj,getFieldDate(mDateTo.value))>0) {
					//alert("Please enter a date that is between selected range");
					alert("Please enter a date (From :" +mDateFrom.value+" To :"+mDateTo.value+")");
					dateField.value = "";
					document.getElementById(datePickerDivID).style.visibility = "visible";
					adjustiFrame();
				} else {
					if (compareDates(dateObj,getFieldDate(mDateFrom.value))<0) {
						//alert("Please enter a date that is between selected range");
						alert("Please enter a date (From :" +mDateFrom.value+" To :"+mDateTo.value+")");
						dateField.value = "";
						document.getElementById(datePickerDivID).style.visibility = "visible";
						adjustiFrame();
					}
				}

			}
		
		}
	}else{
		if (dateField.name == endDateName) {
			var startDateField = document.getElementsByName(startDateName).item(0);
			var startdateObj = getFieldDate(startDateField.value);
			var dateObj=new Date();
			dateObj.setTime(startdateObj.getTime() + (1 * 24 * 60 * 60 * 1000));
			dateField.value = getDateString(dateObj);
		}
		if (dateField.name == startDateName) {
			var today = new Date();
			//var dateObj.setTime(today.getTime() + (dateStartFrom * 24 * 60 * 60 * 1000));
			dateField.value = getDateString(today);
		}
	}
	/*if (dateField.name == endDateName) {
		var dateObj = getFieldDate(dateField.value);
		var startDateField = document.getElementsByName(startDateName).item(0);
		var startdateObj = getFieldDate(startDateField.value);
		var dur=document.getElementById("duration");
		dur.value=(dateObj.getTime()-startdateObj.getTime())/(24 * 60 * 60 * 1000);
	}
	if (dateField.name == startDateName) {

		var dur=document.getElementById("duration");
		var dateObj = getFieldDate(dateField.value);
		
		if (endDateName && endDateName!='undefined'){
			var endDateField = document.getElementsByName(endDateName).item(0);
			var endDateObj = getFieldDate(endDateField.value);
			var dur=document.getElementById("duration");
			dur.value=(endDateObj.getTime()-dateObj.getTime())/(24 * 60 * 60 * 1000);
		}

	}*/
}

function compareDates(date1,date2){
	if(date1.getYear()>date2.getYear()){
		return 1;
	}else{
		if(date1.getYear()<date2.getYear()){
			return -1;
		}else{
			if(date1.getMonth()>date2.getMonth()){
				return 1;
			}else{
				if(date1.getMonth()<date2.getMonth()){
					return -1;
				}else{
					if(date1.getDate()>date2.getDate()){
						return 1;
					}else{
						if(date1.getDate()<date2.getDate()){
							return -1;
						}else{
							return 0;
						}
					}
				}
			}
		}
	}
}

 function setCheckOutDate(obj){

 		var duration=obj.value;
 		var txtOut=	document.getElementById('checkoutdate');
 		var txtIn=	document.getElementById('checkindate');

 		var inDate=getFieldDate(txtIn.value);
 		var dateObj = getFieldDate(txtOut.value);
 		if(eval(duration)>0){
 			dateObj.setTime(inDate.getTime() + (eval(duration) * 24 * 60 * 60 * 1000));
 			txtOut.value=getDateString(dateObj);
 		}else{
 			alert("Invalid Duration");
 		}

	}

function updateDateField(dateFieldName, dateString,startDateName,endDateName)
{	
	//alert(dateFieldName);
  var targetDateField = document.getElementsByName(dateFieldName).item(0);  
  if (dateString) {  	
    targetDateField.value = dateString;
  }
  document.getElementById(datePickerDivID).style.visibility = "hidden";
  adjustiFrame();  
  //if (dateString)
    datePickerClosed(targetDateField,startDateName,endDateName);
}

function adjustiFrame(pickerDiv, iFrameDiv)
{
  if (!document.getElementById(iFrameDivID)) {
    // don't use innerHTML to update the body, because it can cause global variables
    // that are currently pointing to objects on the page to have bad references
    //document.body.innerHTML += "<iframe id='" + iFrameDivID + "' src='javascript:false;' scrolling='no' frameborder='0'>";
    var newNode = document.createElement("iFrame");
    newNode.setAttribute("id", iFrameDivID);
    newNode.setAttribute("src", "javascript:false;");
    newNode.setAttribute("scrolling", "no");
    newNode.setAttribute("frameborder", "0");
    document.body.appendChild(newNode);
  }

  if (!pickerDiv)
    pickerDiv = document.getElementById(datePickerDivID);
  if (!iFrameDiv)
    iFrameDiv = document.getElementById(iFrameDivID);

  try {
    iFrameDiv.style.position = "absolute";
    iFrameDiv.style.width = pickerDiv.offsetWidth;
    iFrameDiv.style.height = pickerDiv.offsetHeight;
    iFrameDiv.style.top = pickerDiv.style.top;
    iFrameDiv.style.left = pickerDiv.style.left;
    iFrameDiv.style.zIndex = pickerDiv.style.zIndex - 1;
    iFrameDiv.style.visibility = pickerDiv.style.visibility;
  } catch(e) {
  }
}


function setMainDateFrom(mmDateFrom) {

	mDateFrom = mmDateFrom;
}

function setMainDateTo(mmDateTo) {
	mDateTo = mmDateTo;
}



}
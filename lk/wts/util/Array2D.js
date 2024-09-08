	function Array2D(){


	}

	var columnNo=0;
	Array2D.prototype.sortAsending = function(array2d,colNo,type){
		columnNo=colNo;
		var columnType=type.toLowerCase();
		if(columnType=="integer"){
			array2d.sort(compareAsendingByInteger);
		}
		else if(columnType=="date"){
			array2d.sort(compareAsendingByDate);
		}
		else{
			array2d.sort(compareAsendingByString);
		}
		return array2d;
	}
	Array2D.prototype.sortDesending = function(array2d,colNo,type){
			columnNo=colNo;
			var columnType=type.toLowerCase();
			if(columnType=="integer"){
				array2d.sort(compareDesendingByInteger);
			}
			else if(columnType=="date"){
				array2d.sort(compareDesendingByDate);
			}
			else{
				array2d.sort(compareDesendingByString);
			}	
			return array2d;
	
	}

  function compareAsendingByString(a, b) {
    	var x = a[columnNo].toLowerCase();
    	var y = b[columnNo].toLowerCase();
    	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}


	function compareAsendingByDate(a, b) {
    	var x = getFieldDate(a[columnNo],"dmy");
    	var y = getFieldDate(b[columnNo],"dmy");
    	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}

	function compareAsendingByInteger(a, b) {
	    var x = a[columnNo];
	    var y = b[columnNo];

		x=x.replace("&nbsp;","");
	    y=y.replace("&nbsp;","");
	    x=x.replace(",","");
	    y=y.replace(",","");
	    x=eval(x);
	    y=eval(y);

	    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}
	
	function compareDesendingByString(a, b) {
    	var x = a[columnNo].toLowerCase();
    	var y = b[columnNo].toLowerCase();
    	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	}


	function compareDesendingByDate(a, b) {
    	var x = getFieldDate(a[columnNo],"dmy");
    	var y = getFieldDate(b[columnNo],"dmy");
    	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	}

	function compareDesendingByInteger(a, b) {
	    var x = a[columnNo];
	    var y = b[columnNo];

		  x=x.replace("&nbsp;","");
	    y=y.replace("&nbsp;","");
	    x=x.replace(",","");
	    y=y.replace(",","");
	    x=eval(x);
	    y=eval(y);
	    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	}
	
	
var dayArrayMed = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var monthArrayShort = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

function getMonthValue(txtMonth){	
	for(var i=0;i<monthArrayShort.length;i++){
		if(monthArrayShort[i]==txtMonth){
			return i;
		}
	}
}
function getFieldDate(dateString,dateFormat)
{
  var dateVal;
  var dArray;
  var d, m, y;
	
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
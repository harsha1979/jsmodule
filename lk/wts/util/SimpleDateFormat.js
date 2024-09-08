
function SimpleDateFormat(pattern){
	this.pattern=pattern;
	this.compilePatternArr=[];
	
	
	function compilePattern(pattern){
		var compilePatternArr=[];		
		if(pattern){
			
			for(var i=0;i<pattern.length;i++){
				var count=1;
				var c=pattern.charAt(i);
				while(i+1<pattern.length && pattern.charAt(i+1)==c){
					count++;
					i++;
				}
				compilePatternArr[compilePatternArr.length]=new Array(c,count);				
			}
		}
		return compilePatternArr;
	}
	this.compilePatternArr=compilePattern(this.pattern);
	//alert(this.compilePatternArr);
}



/**
Convert a string to a JavaScript Date object.
*/

SimpleDateFormat.prototype.parse=function(dateString){
	var dateVal=new Date();
	dateVal.setTime(0);
	//dateVal.setTimezoneOffset(0);
	function getDateFieldValue(fieldType,count,dataValue){
		
		var dataArr=[];
		switch(fieldType){
			case "M":
				switch(count){
					case 3:
						dataArr= new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
						
						break;
					default:
						dataArr= new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
				}
				break;
			case "E":
				switch(count){
					case 3:
						dataArr= new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
						break;
					default:
						dataArr=  new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
				}
				break;
				
		}
		var rtnValue=null;
		for(var i=0;i<dataArr.length;i++){
			if(dataArr[i]==dataValue){
				rtnValue=i;
			}		
		}
		return rtnValue;
	}
	
	function setDateFieldValue(dateObj,fieldType,dataValue){
		switch(fieldType){
			case "d":
				dateObj.setDate(dataValue);
				break;
			case "M":
				dateObj.setMonth(dataValue);
				break;
			case "y":
				//if(dataValue.length>2){
				//	dateObj.setFullYear(dataValue);
				//}else{
					dateVal.setFullYear(dataValue);
				//}
				break;	
			case "E":
				dateObj.setDay(dataValue);
				break;	
			case "m":
				dateObj.setMinutes(dataValue);
				break;
			case "H":
				dateObj.setHours(dataValue);
				break;
			case "s":
				dateObj.setSeconds(dataValue);
				break;					
		}		
	}
	
	if(this.compilePatternArr.length>0){
		//d
		var location=0;
		for(var i=0;i<this.compilePatternArr.length;i++){
			
			var patternData=this.compilePatternArr[i];
			var dataValue=dateString.substring(location,location+patternData[1]);
			location+=patternData[1];
			if(patternData[1]>2){
				var temp=getDateFieldValue(patternData[0],patternData[1],dataValue);
				if(temp){
					dataValue=temp;
				}
			}else{				
				
			}
			setDateFieldValue(dateVal,patternData[0],parseInt(dataValue));
		}		
	}
	
	return dateVal;
	/*var dateVal;
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
  	} catch(e) {
  		alert("Invalid Date!\nPlease Enter dd/MMM/YYYY");
    	dateVal = new Date();
  	}
  	return dateVal;*/
}

/**
Convert a JavaScript Date object to a string, based on the dateFormat and dateSeparator
variables at the beginning of this script library.
*/
SimpleDateFormat.prototype.format=function(dateObj){
	
	
	function getDateFormatArray(fieldType,count){
		
		switch(fieldType){
			case "M":
				switch(count){
					case 3:
						return new Array('','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
						break;
					default:
						return new Array('','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
				}
				break;
			case "E":
				switch(count){
					case 3:
						return new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
						break;
					default:
						return  new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
				}
				break;
				
		}
		return null;
	}
	
	function fixedLength(data,maxLength,prefix){
		var tempData=""+data;
		if(tempData.length<maxLength){
			for(var i=tempData.length;i<maxLength;i++){
				data=prefix+data;
			}
		}else{
			data=tempData.substring(tempData.length-maxLength);
		}
		
		return data;
	}
	
	function getDateFieldValue(dateObj,fieldType){
		switch(fieldType){
			case "d":
				return dateObj.getDate();
				break;
			case "M":
				return dateObj.getMonth()+1;
				break;
			case "y":
				return dateObj.getFullYear();
				break;	
			case "E":
				return dateObj.getDay();
				break;	
			case "m":
				return dateObj.getMinutes();
				break;
			case "H":
				return dateObj.getHours();
				break;
			case "s":
				return dateObj.getSeconds();
				break;					
		}
		return null;
	}
	//d
	var formattedString="";
	if(this.compilePatternArr.length>0){
		
		for(var i=0;i<this.compilePatternArr.length;i++){
			var patternData=this.compilePatternArr[i];
			var formatValue="";
			if(patternData[1]>2){
				var fieldArr=getDateFormatArray(patternData[0],patternData[1])
				var fieldValue=getDateFieldValue(dateObj,patternData[0]);
				
				if(fieldArr){
					formatValue=fieldArr[fieldValue];
				}else{
					if(fieldValue){
						formatValue=fixedLength(fieldValue,patternData[1],"0");
					}else{
						formatValue=fixedLength(patternData[0],patternData[1],patternData[0]);
					}
				}
				formattedString+=formatValue;
			}else{
				var fieldValue=getDateFieldValue(dateObj,patternData[0]);
				if(fieldValue){
					formatValue=fixedLength(fieldValue,patternData[1],"0");
				}else{
					formatValue=fixedLength(patternData[0],patternData[1],patternData[0]);
				}
				formattedString+=formatValue;
			}
		}
	}
	return formattedString;	
}
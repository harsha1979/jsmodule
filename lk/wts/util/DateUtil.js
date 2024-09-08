
function DateUtil(){
	
	var dayArrayShort = new Array('Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa');
	var dayArrayMed = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
	var dayArrayLong = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
	var monthArrayShort = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var monthArrayMed = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec');
	var monthArrayLong = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
}

DateUtil.prototype.compareDates=function (date1,date2){	
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


DateUtil.prototype.getMonthValue=function(txtMonth){	
	for(var i=0;i<monthArrayShort.length;i++){
		if(monthArrayShort[i].toUpperCase()==txtMonth.toUpperCase()){
			return i;
		}
	}
}
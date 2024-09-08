function WTSException(message,categoryDesc,locationCode,throwable){
	this.type = 'WTSException'; 
	if(arguments.length>0){
		if(arguments[0] && arguments[0].type=='WTSException'){
			this.throwable = arguments[0] ;
		}else{
			this.categoryDesc = categoryDesc;
			this.locationCode = locationCode;
			this.message = message;
			this.call = null 
			this.throwable = throwable ;
		}
	}
}
WTSException.prototype.setMessage=function(message){
	this.message = message;
}
 
WTSException.prototype.getMessage=function(){
	return this.message;
}

WTSException.prototype.setLocationCode=function(locationCode){
	this.locationCode = locationCode;
}
 
WTSException.prototype.getLocationCode=function(){
	return this.locationCode;
}

WTSException.prototype.setCategoryDesc=function(categoryDesc){
	this.categoryDesc = categoryDesc;
}
 
WTSException.prototype.getCategoryDesc=function(){
	return this.categoryDesc;
}

WTSException.prototype.setThrowable=function(throwable){
	this.throwable = throwable;
}
 
WTSException.prototype.getThrowable=function(){
	return this.throwable;
}

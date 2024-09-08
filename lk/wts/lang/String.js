String.prototype.startsWith=function(prefix){
	if(this.match('^'+prefix)==null){
		return false ;
	}
	return true ;
}
String.prototype.endsWith=function(sufix){
	if(this.match(sufix+'^')==null){
		return false ;
	}
	return true ;
}
String.prototype.equals=function(str){
	if(this!=str){
		return false ;
	}
	return true ;
}
String.prototype.equalsIgnoreCase=function(str){
	if(this.toUpperCase()!=str.toUpperCase()){
		return false ;
	}
	return true ;
}
String.prototype.trim=function(){

	var str = "" ;

	for(var index=0; index<this.length; index++) {
		if(this.charCodeAt(index)!=32){
			str = this.substring(index);
			break;
		}		
	}
	for(var index=str.length; index>=0; index--) {
		if(str.charCodeAt(index-1)!=32){
			str = str.substring(0,index);
			break;
		}		
	}
	return str ;
}

//String.fromCharCode(code);
String.prototype.replaceAll=function(regex,replacement){
	var sRegExInput = new RegExp(regex, "g");
	return this.replace(sRegExInput,replacement);
}
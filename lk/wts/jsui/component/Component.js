function Component(){
	this.type = 'Component';
	this.content = null ;
}
Component.prototype.getContent=function(){
	return this.content ;
}
Component.prototype.setContent=function(content){
	this.content = content ;
}
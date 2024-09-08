function JSPanel(label,content){
	this.JSPanel(label,content);
}
JSPanel.prototype.JSPanel=function(label,content){
	this.type= 'JSPanel';
	this.content = content ;
	this.label = label ;
}

JSPanel.prototype.setContent=function(content){
	this.content = content ;
}
JSPanel.prototype.getContent=function(){
	return this.content;
}
JSPanel.prototype.setLabel=function(label){
	this.label = label ;
}
JSPanel.prototype.getLabel=function(){
	return this.label;
}

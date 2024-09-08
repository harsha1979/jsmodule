/*Function.prototype.extend=function(superClass){
	for (var property in superClass.prototype){
		if(property!='extend' && property!='type'){
			this.prototype[property] = superClass.prototype[property];
		}
	}
	this.prototype[superClass.prototype.type] = superClass.prototype.constructor;
}*/
Function.prototype.extend=function(superClass){
	
	for (var property in superClass.prototype){
		if(property!='extend' && property!='type' && property!='_superClass' && property!='callSuper' && !this.prototype[property]){
			this.prototype[property] = superClass.prototype[property];
			//this.prototype[property] = function(){ this['superClass'][property].call();};
		}
	}
	/*var _callSuper = function(source,destination){
		for (var property in source.prototype){
			if(property!='extend' && property!='type' && property!='_superClass' && property!='callSuper' && !destination.prototype[property]){
				destination.prototype[property] = source.prototype[property];
			}else if(property=='_superClass'){
				_callSuper(source.prototype[property],destination);
			}
		}
	};*/
	//_callSuper(superClass,this);
	
	this.prototype["_superClass"] = superClass ;
	this.prototype["callSuper"] = function(){
		var str = 'this["superClass"]=new this["_superClass"](';
		for(var index=0; index<arguments.length; index++) {
			if(index!=0){
				str += "," ;
			}
			str +="\"" + arguments[index] + "\"";
		}
		str +=");";
		eval(str);
	};
	
	
	
	//this.prototype["_constructor"] = this.prototype.constructor;
	//window[this.prototype.type+"_constructor"] = this.prototype.constructor;
	//window[this.prototype.type] = function B(){alert("test");window[eval("this.prototype.type")+"_constructor"].call();};
	//this.prototype.constructor = function B(){alert("test");};	
}

// function(){this.supers = new superClass(); this.prototype[superClass.prototype.type+"_Constructor"].call();}


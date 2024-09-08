wts.using('lk.wts.ajax.*;');
wts.using('lk.wts.comm.*;');
wts.using('lk.wts.jsaxb.*;');
function CommonQuery(){
	this.type='CommonQuery';
	this.requestURL = "commonquery" ;
	this.ajc = null ;
	this.xob =null;
}

CommonQuery.prototype.getById=function(entityType,param,selectContent){	
	
	
	var select = new Select();  	
	try{
		if(entityType!=null && param!=null){
			select.setParameter(param);			
			if(selectContent!=null){
				select.setSelectContent(selectContent);			
			}
		    var record = this.ajc.doClientRequest(select,entityType,this.requestURL);
			return record;
		}else{
			throw new WTSException("Missing entityType or param.","lk.wts.commonquery.CommonQuery.getByID");
		}
	}catch(ex){
		throw ex;
	}	
}

CommonQuery.prototype.getAll=function(entityType,selectContent){
	var select = new Select();  
	var recordRange = new RecordRange(-1,-1);
	select.setRecordRange(recordRange);
	try{
		if(entityType!=null){
			if(selectContent!=null){
				select.setSelectContent(selectContent);			
			}
		    var dataCollection = this.ajc.doClientRequest(select,entityType,this.requestURL);
			return dataCollection;
		}else{
			throw new WTSException("Missing entityType.","lk.wts.commonquery.CommonQuery.getAll");
		}
	}catch(ex){
		throw ex;
	}	
}

CommonQuery.prototype.getForCondition=function(entityType,param,selectContent,start,count){
	var select = new Select();  	
	var recordRange = new RecordRange(start,count);
	try{
		if(entityType!=null && param!=null){
			select.setParameter(param);
			select.setRecordRange(recordRange);
			if(selectContent!=null){
				select.setSelectContent(selectContent);			
			}
		    var dataCollection = this.ajc.doClientRequest(select,entityType,this.requestURL);
			return dataCollection;
		}else{
			throw new WTSException("Missing entityType or param.","lk.wts.commonquery.CommonQuery.getForCondition");
		}
	}catch(ex){
		throw ex;
	}	
}

CommonQuery.prototype.remove = function(entityType,vo){
	var deleteOp = new Delete();
	try{
		if(vo!=null){
			var data = this.xob.objectToXml(vo);  	
			deleteOp.setData(escape(data));
			var resObject = this.ajc.doClientRequest(deleteOp,entityType,this.requestURL);
		    return resObject;
		}else{
			throw new WTSException("Missing vo.","lk.wts.commonquery.CommonQuery.remove");
		}
	}catch(ex){
		throw ex;
	}
}

CommonQuery.prototype.save = function(entityType,vo){
	var insert = new Insert();
	try{
		if(vo!=null){
			var data = this.xob.objectToXml(vo);
			insert.setData(escape(data));
			var resObject = this.ajc.doClientRequest(insert,entityType,this.requestURL);
		    return resObject; 		
		}else{
			throw new WTSException("Missing vo.","lk.wts.commonquery.CommonQuery.save");
		}
	}catch(ex){
		throw ex;
	}
}

CommonQuery.prototype.update=function(entityType,vo){
	var update = new Update();
	try{
		if(vo!=null){
			var data = this.xob.objectToXml(vo);
			update.setData(escape(data));
			var resObject = this.ajc.doClientRequest(update,entityType,this.requestURL);
		    return resObject; 		
		}else{
			throw new WTSException("Missing vo.","lk.wts.commonquery.CommonQuery.update");
		}
	}catch(ex){
		throw ex;
	}	
}

CommonQuery.prototype.setURL=function(requestURL){
	if(this.ajc==null){
		this.ajc = new AJAXController() ;
	}
	if(this.xob==null){
		this.xob = new XMLObjectBuilder();
	}
	this.requestURL = requestURL ;
}
var query = new CommonQuery();
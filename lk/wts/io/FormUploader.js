

function FormUploader(formNode,url,encType){

			var iframes=document.getElementsByName("testIFrame");
			var iFrame=null;
			if(iframes.length>0){
			
			}else{
				iFrame=document.createElement("<iframe src='a.html' name='testIFrame' onload='doOnIFrameLoad()'>");
				document.body.appendChild(iFrame);
			}
			iFrame.style.left = "0px";
			iFrame.style.height = "1px";
			iFrame.style.visibility = "hidden";
			iFrame.onload=this.doOnIFrameOnLoad;
			iFrame.name="testIFrame";
			
			this.target=formNode.target;
			this.action=formNode.action;
			this.enctype=formNode.enctype;
			formNode.target=iFrame.name;
			formNode.action=url;
			formNode.enctype=encType;
			var _this=this;
			this.formNode=formNode;
			this.formNode=formNode;
			formNode.submit();
			this.success=true;
}


FormUploader.prototype.doOnIFrameOnLoad=function(){

		if(_this.success){
			_this.formNode.target=_this.target;		
			_this.formNode.action=_this.action;
			_this.formNode.enctype=_this.enctype;
		}
}

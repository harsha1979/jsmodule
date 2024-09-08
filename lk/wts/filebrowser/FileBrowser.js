function FileBrowser(holderid,clickOnUp,dbClickOnRecord,clickOnRecord,clickOnAdd,dynamicDataProcessor,reference){
	this.type = 'FileBrowser' ;
	this.holder =  document.getElementById(holderid);
	this.holder.innerHTML = this.getContentHTML();
	
	this.upButton =  document.getElementById('id_up');
	this.upButton.onclick = this.clickOnUpFileBrowser ;
	this.upButton.reference = this ;
	
	this.addButton = document.getElementById('id_add');
	this.addButton.onclick = this.clickOnAddFileBrowser ;
	this.addButton.reference = this ;
	
	this.clickOnAdd = clickOnAdd ;
	
	
	this.clickOnUp = clickOnUp ;
	this.dbClickOnRecord  = dbClickOnRecord ;
	this.clickOnRecord  = clickOnRecord ;
	
	this.dynamicDataProcessor = dynamicDataProcessor ;

	this.dataTableRoot =  document.getElementById('id_datatableroot');
	
	this.flow = new Array();
	
	this.selectedTag = null ;
	this.selectedComponent = null ;
	
	this.reference = reference ;
	
	this.parentKey = "";
	this.pop = new ToolTip();
	this.init();
}

FileBrowser.prototype.init=function(){
	this.add(this.dynamicDataProcessor.getComponent().getElementName(),this.dynamicDataProcessor.getComponent().getElementName(),this.dynamicDataProcessor.getComponent().type,this.getToolTip(this.dynamicDataProcessor.getComponent()),this.dynamicDataProcessor.getComponent().getXMLElements().size());	
	
	this.path = document.getElementById("id_displaypath");
	this.path.onmouseover = this.pathOnMouseOver ;
	this.path.onmouseout = this.pathOnMouseOut ;
	this.path.onmousemove = this.pathOnMouseMove ;
	this.path.reference = this ;
}
FileBrowser.prototype.pathOnMouseOver=function(){
	if(event.srcElement.scrollWidth>event.srcElement.offsetWidth){
		var htmlCode ='<table style="font-size:11px;font-family: Verdana, Arial, Helvetica, sans-serif;background-color:#CCCCCC;color:#000000;border-width:1px;border-style:inset;border-color:black">';
		htmlCode+='  <tr>';
		htmlCode+='    <td><p><strong>'+event.srcElement.innerText+'</strong></p></td>';
		htmlCode+='  </tr> ';
		htmlCode+='</table>';
		this.reference.pop.show(htmlCode,event.srcElement,event.x,event.y);
	}
}
FileBrowser.prototype.pathOnMouseOut=function(){
	if(this.reference.pop){
		this.reference.pop.hide();
	}
}

FileBrowser.prototype.pathOnMouseMove=function(){
	if(this.reference.pop.visible){
		this.reference.pop.refresh(event.x,event.y);
	}
}

FileBrowser.prototype.load=function(key,type,toolTip,imgSrc){
	this.clear();
	this.parentKey = key ;
	var prevKey = this.getPreviousKey();
	this.parentKey = prevKey ;
	if(prevKey){
		var element = this.dynamicDataProcessor.getElement(prevKey);
		if(element.type=='XMLElement'){
			var elements =element.getXMLElements();
			var iterator = elements.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.add(next.getElementName(),prevKey+"/"+next.getElementName(),next.type,this.getToolTip(next),next.getXMLElements().size());
			}
			var attributes =element.getXMLAttributes();
			var iterator = attributes.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.add(next.getAttributeName(),prevKey+"/"+next.getAttributeName(),next.type,this.getToolTip(next),0);
			}
			this.parentKey = prevKey ;
			
		}else{
			wts.debug("not XMLElement");
		}
	}else{
		this.add(this.dynamicDataProcessor.getComponent().getElementName(),this.dynamicDataProcessor.getComponent().getElementName(),this.dynamicDataProcessor.getComponent().type,this.getToolTip(this.dynamicDataProcessor.getComponent()),this.dynamicDataProcessor.getComponent().getXMLElements().size());
	}	
	
	this.selectRecord(key,true);
}



FileBrowser.prototype.add=function(name,key,type,toolTip,childs){
	if(name==key){
		this.parentKey = null ;
	}
	
	var dataTable =  document.getElementById('id_datatable');
	if(!dataTable){
		if(key){
			this.flow.push(key);
		}
		dataTable = this.createDataTable();
	}
	var row = dataTable.insertRow();
	var cell1 = row.insertCell();
	cell1.width='11px';

	cell1.ondblclick = this.dbClickOnRecordFileBrowser ; 
	cell1.onclick = this.clickOnRecordFileBrowser ;
	
	var img = document.createElement("img");
	img.style.width='11px';
	img.style.height='11px';
	if(type=='XMLElement'){
		img.src= baseURL+'/images/filebrowser/e.gif' ;	
	}else{
		img.src= baseURL+'/images/filebrowser/a.gif' ;
	}

	cell1.appendChild(img);
	img.alt = toolTip ;

	var cell2 = row.insertCell();
	cell2.width='11px';
	//cell2.ondblclick = this.dbClickOnRecordFileBrowser ; 
	
	
	
	var img2 = document.createElement("img");
	if(childs>0){
		cell2.onclick = this.dbClickOnRecordFileBrowser ;
		img2.src= baseURL+'/images/filebrowser/element.gif' ;	
	}else{
		cell2.onclick = this.clickOnRecordFileBrowser ;
		img2.src= baseURL+'/images/filebrowser/attribute.gif' ;	
	}
	cell2.appendChild(img2);
	
	
	var cell3 = row.insertCell();
	cell3.alt = toolTip ;
	
	
	cell1.alt = toolTip ;
	cell2.alt = toolTip ;
	
	/*cell.ondblclick = this.recordOnDBClick ; 
	cell.onclick = this.recordOnClick ;
	cell.reference = this.reference ;*/
	
	//img.ondblclick = this.dbClickOnRecordFileBrowser ; 
	//img.onclick = this.clickOnRecordFileBrowser ;
	
	cell3.ondblclick = this.dbClickOnRecordFileBrowser ; 
	cell3.onclick = this.clickOnRecordFileBrowser ;

	//img.reference = this ;
	cell3.reference = this ;
	cell1.reference = this ;
	cell2.reference = this ;
	
	//cell3.style.fontSize = '11';
	cell3.innerText = name;
	if(key){
		cell3.key = key ;
	}else{
		cell3.key = name ;
	}
	//img.key = cell.key ;
	//img.id=cell.key;
	//cell3.id=cell3.key;
	cell1.key = cell3.key ;
	cell2.key = cell3.key ;
	
	row.id=cell3.key;
	row.key=cell3.key;
	//row.style.backgroundColor='#E4E4E4';
	row.style.cssText = "font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 10px;background-color:#E4E4E4";
}
FileBrowser.prototype.createDataTable=function(){
	var dataTableRoot =  document.getElementById('id_datatableroot');
	dataTableRoot.innerHTML = '' ;
	var dataTable = document.createElement('TABLE');
	dataTable.width="100%";
	dataTable.id = 'id_datatable' ;
	dataTableRoot.appendChild(dataTable);
	return dataTable ;
}

FileBrowser.prototype.clear=function(){
	var dataTableRoot =  document.getElementById('id_datatableroot');
	dataTableRoot.innerHTML = '' ;
}

FileBrowser.prototype.getPreviousKey=function(){
	//this.flow.pop()
	if(this.parentKey && this.parentKey.lastIndexOf("/") != -1){
		return this.parentKey.substring(0,this.parentKey.lastIndexOf("/"));
	}
	return null;
}
FileBrowser.prototype.clickOnRecordFileBrowser=function(){
	window.event.cancelBubble = true ;
	var path = document.getElementById('id_displaypath');
	if(path){
		path.innerHTML = this.key ;
	}
	this.reference.selectRecord(this.key,false);
}

FileBrowser.prototype.selectRecord=function(key,isToTop){

	var selected = document.getElementById(key);
	if(this.selectedTag){
		this.selectedTag.style.backgroundColor='#E4E4E4';
		//this.selectedTag.style.borderWidth = '0px';
		//this.selectedTag.style.borderStyle = 'none';
	}
	var element = this.dynamicDataProcessor.getElement(selected.key);

	this.selectedComponent = element ;
	this.key = selected.key ;
	var path = document.getElementById('id_displaypath');
	if(path){
		path.innerHTML = this.key;
	}
	
	this.selectedTag = selected ;
	this.selectedTag.style.backgroundColor='#ADADAD';
	//this.selectedTag.style.borderWidth = '2px';
	//this.selectedTag.style.borderStyle = 'solid';

	if(isToTop){
		selected.scrollIntoView(false);
		wts.debug(selected.key);
	}
}

FileBrowser.prototype.dbClickOnRecordFileBrowser=function(){
	wts.debug("elementOnDBClick");

	var element = this.reference.dynamicDataProcessor.getElement(this.key);
	if(element && element.type=='XMLElement'){
		
		var elements =element.getXMLElements();
		var attributes =element.getXMLAttributes();
		
		if(elements.size()>0 || attributes.size()>0){
			this.reference.clear();
			this.reference.parentKey = this.key ;
			var path = document.getElementById('id_displaypath');
			if(path){
				path.innerHTML = this.key +"/";
			}
		}
		if(elements){
			var iterator = elements.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.reference.add(next.getElementName(),this.key+"/"+next.getElementName(),next.type,this.reference.getToolTip(next),next.getXMLElements().size());
				
			}
		}
		if(attributes){
			var iterator = attributes.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.reference.add(next.getAttributeName(),this.key+"/"+next.getAttributeName(),next.type,this.reference.getToolTip(next),0);
			}
		}
	}else{
		wts.debug("not XMLElement");
	}
	//this.reference.dbClickOnRecord();
}

FileBrowser.prototype.clickOnUpFileBrowser=function(){
	this.reference.clear();
	var path = document.getElementById('id_displaypath');
	var prevKey = this.reference.getPreviousKey();
	if(prevKey){
		var element = this.reference.dynamicDataProcessor.getElement(prevKey);
		if(element.type=='XMLElement'){
			var elements =element.getXMLElements();
			var iterator = elements.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.reference.add(next.getElementName(),prevKey+"/"+next.getElementName(),next.type,this.reference.getToolTip(next),next.getXMLElements().size());
			}
			var attributes =element.getXMLAttributes();
			var iterator = attributes.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				this.reference.add(next.getAttributeName(),prevKey+"/"+next.getAttributeName(),next.type,this.reference.getToolTip(next),0);
			}
			this.reference.parentKey = prevKey ;
		}else{
			wts.debug("not XMLElement");
		}
		
		if(path){
			path.innerHTML = prevKey+"/" ;
		}
	}else{
		this.reference.add(this.reference.dynamicDataProcessor.getComponent().getElementName(),this.reference.dynamicDataProcessor.getComponent().getElementName(),this.reference.dynamicDataProcessor.getComponent().type,this.reference.getToolTip(this.reference.dynamicDataProcessor.getComponent()),this.reference.dynamicDataProcessor.getComponent().getXMLElements().size());
		path.innerHTML = '/' ;
	}
}

FileBrowser.prototype.clickOnAddFileBrowser=function(){
	if(this.reference.selectedTag){
		this.reference.clickOnAdd(this.reference.selectedTag.key,this.reference.selectedComponent,this.reference.reference);
	}
}

FileBrowser.prototype.getToolTip=function(component){
	var toolTip = '';
	if(component.type=='XMLElement'){
		toolTip +='Element Name : '+component.getElementName()+'\n';
	}else if(component.type=='XMLAttribute'){
		toolTip +='Attribute Name : '+component.getAttributeName()+'\n';
		toolTip +='Type : '+component.getAttributeType()+'\n';
		toolTip +='Length : '+component.getAttributeLength()+'\n';
	}
	return toolTip ;
}
/*FileBrowser.prototype.init=function(element,key,func,reference){
	var dataTableRoot =  document.getElementById('id_datatable');
	dataTableRoot.innerHTML = '' ;
	var dataTable = document.createElement('TABLE');
	var row = dataTable.insertRow();
	var cell = row.insertCell();
	cell.innerText = element.getElementName(); 
	cell.ondblclick = this.recordOnDBClick ;
	cell.reference = reference ;
	cell.key = key ;
	dataTableRoot.appendChild(dataTable);
}


*/

/*
FileBrowser.prototype.load=function(element,key,func,reference){
	
	
	this.flow.push(key);
	if(element.type=='XMLElement'){
		var dataTableRoot =  document.getElementById('id_datatable');
		dataTableRoot.innerHTML = '' ;
		
		
		
		var dataTable = document.createElement('TABLE');
		var elements = element.getXMLElements();
		if(elements){
			var iterator = elements.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				var row = dataTable.insertRow();
				var cell = row.insertCell();
				cell.innerText = next.getElementName(); 
				cell.ondblclick = func ;
				cell.reference = reference ;
				cell.key = key +'/'+ next.getElementName();
			}
		}
		var attributes = element.getXMLAttributes();
		if(attributes){
			var iterator = attributes.iterator();
			while (iterator.hasNext()) {
				var next = iterator.next();
				var row = dataTable.insertRow();
				var cell = row.insertCell();
				cell.innerText = next.getAttributeName(); 
				cell.ondblclick = func ;
				cell.reference = reference ;
				cell.key = key +'/'+ next.getAttributeName();
			}
		}
		dataTableRoot.appendChild(dataTable);
	}
}
*/

FileBrowser.prototype.getContentHTML=function(){
	
	var str='<TABLE WIDTH="100%" ID="id_maintable" STYLE="border-width: 2px;border-style: solid">';
	str+='	<TR>';
	str+='		<TD align="left">';
	str+='		<TABLE WIDTH="100%" STYLE="border-width: 2px;border-style: solid;width:100%;">';
	str+='			<TR>';
	//str+='				<TD><IMG SRC="jsmodule/images/filebrowser/back.jpg" ALT="" /></TD>';
	//str+='				<TD><IMG SRC="jsmodule/images/filebrowser/next.jpg" ALT="" /></TD>';
	str+='				<TD><IMG ID="id_up" SRC="http://harsha/jsmodule/images/filebrowser/up.jpg" ALT="Up" /></TD>';
	str+='				<TD id="id_fullpath" style="font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 10px;font-weight: bold;"></TD>';
	str+='			</TR>';
	str+='		</TABLE>';
	str+='		</TD>';
	str+='	</TR>';
	str+='	<TR>';
	str+='		<TD >';
	str+='		<DIV  ID="id_datatableroot" STYLE="overflow: scroll;height: 200px"></DIV>';
	str+='		</TD>';
	str+='	</TR>';
	str+='</TABLE>';
	
	str='<table id="id_maintable" width="285" height="100%" border="0" align="left" cellpadding="0" cellspacing="0">';
	str+='	<tr><td align="left"><table><tr>';
	//str+='		<td height="23" align="left" valign="top" background="jsmodule/images/filebrowser/pxx.gif" bgcolor="#313153"><img src="jsmodule/images/filebrowser/back.jpg" width="30" height="19" border="0" id="id_img_back" alt="" /></td>';
	//str+='		<td height="23" align="left" valign="top" background="jsmodule/images/filebrowser/pxx.gif" bgcolor="#313153"><img src="jsmodule/images/filebrowser/fw.jpg" width="30" height="19" border="0" id="id_img_forward" alt="" /></td>';
	str+='		<td height="23" align="left" valign="top" background="jsmodule/images/filebrowser/pxx.gif"><img src="jsmodule/images/filebrowser/up.jpg" id="id_up" border="0" id="id_img_up" alt="" /></td>';
	str+='		<td align="left" valign="top" background="jsmodule/images/filebrowser/pxx.gif" id="" width="200px" ><div id="id_displaypath" style="color:black;overflow-x:hidden;width:200px;height:100%;font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 10px;font-weight:bold"></div></td>';
	str+='		<td align="left" valign="top" background="jsmodule/images/filebrowser/pxx.gif" ><img src="jsmodule/images/filebrowser/add.gif" id="id_add"  alt="" /></td>';
	str+='	</tr></table></td></tr>';
	str+='	<tr>';
	str+='		<td height="100%" width="100%" colspan="1" align="left" valign="top" bgcolor="#F9FAFF">';
	str+='		<div id="id_datatableroot" style="width:100%;height:100%;overflow:auto;background:#CCCCCC"></div>';
	str+='		</td>';
	str+='	</tr>';
	str+='</table>';


	

	return str ;
}

/*
 * <table width="100%" border="0" align="left" cellpadding="0" cellspacing="0">
							<tr>
								<td width="41%" height="23" align="left" valign="top" background="images/pxx.gif" bgcolor="#313153" scope="col"><a href=""><img src="images/back.jpg" width="30" height="19" border="0"
									id="id_img_back" alt="" /></a> <a href=""><img src="images/fw.jpg" width="30" height="19" border="0" id="id_img_forward" alt="" /></a><a href=""><img src="images/up.jpg" width="30"
									height="19" border="0" id="id_img_up" alt="" /></a></td>
								<td width="42%" align="right" valign="top" background="images/pxx.gif" bgcolor="#313153" scope="col"><input name="textfield" type="text" class="controller" id="id_text_search" size="22" /></td>
								<td width="17%" align="left" valign="top" background="images/pxx.gif" bgcolor="#313153" scope="col"><img src="images/add.gif" width="55" height="20" alt="" /></td>
							</tr>
							<tr>
								<td height="105px" colspan="3" align="left" valign="top" bgcolor="#F9FAFF" scope="col">
								<div style="width:100%;height:100%;overflow:scroll;background:#CCCCCC"></div>
								</td>
							</tr>
						</table>
 * */

document.write("<script src='http://localhost/wtsteam/lk/wts/util/Vector.js' language='javascript' type='text/javascript'></script>");
document.write("<script src='http://localhost/jsmodule/lk/wts/jsui/floatingpane/FloatingPaneFactory.js' language='javascript' type='text/javascript'></script>");

function TestFP(){	
	var paneFactory = new FloatingPaneFactory();
	var floatingPane = paneFactory.createPane();

        //var cont = new Container();
        //floatingPane.setContent(cont.getContentPane());  
        //Just add some contaents to the floating pane
        floatingPane.setContent(document.createElement("<Input type='text' value='bbbbbbbbbb'   >"));  
        floatingPane.setContent(document.createElement("<Input type='text' value='aaaaaaaaaaa'   >"));  
        //floatingPane.setContent(document.createElement("<DIV>"));  

	//floatingPane.setStyleName("sample");
	floatingPane.setStyleByString("border: 3px solid orange;position:absolute;width:300;height:100");
	floatingPane.setHeight(300); 
	floatingPane.setWidth(300); 
	floatingPane.setBackgroundColor('white');

 	//var x = document.body;
	
 	var x = document.getElementById("test");
 	x.appendChild(floatingPane.getFloatingPane());
 	
}

function popUp()
{
	testwindow= window.open ("", "mywindow","location=1,status=1,scrollbars=1,resizable=1,width=300,height=100");
	testwindow.moveTo(100,100);
	return testwindow;
}



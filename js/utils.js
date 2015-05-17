/*function that display a text in a debug*/ 
function debug(text){
document.getElementById("debug").innerHTML = text;
}

//function that display a text in a div
function debug2(id,text){
	document.getElementById(id).innerHTML = text;
}


//function to display or not an HTML element.
//Parameters : id of the html element
function showHideFunction(id){
	if(document.getElementById(id).style.display == "none"){
		document.getElementById(id).style.display = "block";
	}
	else{
		document.getElementById(id).style.display = "none";
	}
}

//function to display or not an HTML element.
//Parameters : id of the html element
function showHideFunction2(id1, id2){
        document.getElementById(id2).style.display = "none";
		document.getElementById(id1).style.display = "block";
}

//Description : Callback function to log data pressing "enter" key on the keyboard
function doSomethingOnEnterKey(event,func){
	if(event.which == 13 || event.keyCode == 13)
	{
        	func();
	}
}

//function that convert a degree latitude into format DegÂ°Min'Sec" Cardinal
//Parameter 1 : latitude in degree
//Return : a formated string in degree, minutes, seconds and orientation.
function convertLatDMS( dd ){
        var convertdd = Math.abs(dd);
        var Deg = Math.floor(convertdd);
        var Min = Math.floor((convertdd - Deg) * 60);
        var Sec = Math.floor((convertdd - Deg - (Min/60))*3600);
        var Cardinal = ((dd > 0) ? "N" : "S");
        return Deg+"°"+Min+"\'"+Sec+"\" "+Cardinal;
}

//function that convert a degree longitude into format DegÂ°Min'Sec" Cardinal
//Parameter 1 : longitude in degree
//Return : a formated string in degree, minutes, seconds and orientation.
function convertLonDMS( dd ) {
        var convertdd = Math.abs(dd);
        var Deg = Math.floor(convertdd);
        var Min = Math.floor((convertdd - Deg) * 60);
        var Sec = Math.floor((convertdd - Deg - (Min/60))*3600);
        var Cardinal = ((dd > 0) ? "E" : "W");
        return Deg+"°"+Min+"\'"+Sec+"\" "+Cardinal;
}

//Description : Get today's date in a formatted string.
//Return : today's date as mm/dd/yyyy
function GetTodayDate(){
  	var today = new Date();
  	var dd = today.getDate();
  	var mm = today.getMonth()+1; //January is 0!
  	var yyyy = today.getFullYear();

  	if(dd<10){
   		dd='0'+dd;
  	} 

  	if(mm<10){
    		mm='0'+mm;
  	}	 

  	today = mm+' / '+dd+' / '+yyyy;
  	return today;
}

//Description : Function that display an error message in the browser popup.
//Parameter : an error object.
function onFailure(error){
  	alert(error.message);
}

//Description : Transform single dimension array into a 2 dimensions one
function stringToTable2Dim(string, separator, n){
  var firstindex = 0;
  var table = string.split(separator);
  var table2dim=[];
  for(var i=0 ; i < n ; i++){
    table2dim[i]=[table[firstindex],table[firstindex+1],table[firstindex+2],table[firstindex+3]];
    firstindex+=4;
  }
  return table2dim;
}

//Description : Generate MonthTable
function generateMonthTable(div, data){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var htmltable = "<p id='monthheader'>Year 2015</p><table id='monthlogtable'><tr><td></td><td class='monthlogcells tablecyclingheader'><img style='position:relative;top:1px' src='http://virtualtranscanada.com/resources/velo24px.png'></td><td class='monthlogcells tablewalkingheader'><img style='position:relative;top:1px' src='http://virtualtranscanada.com/resources/walk24px.png'></td><td class='monthlogcells tableswimmingheader'><img style='position:relative;top:1px' src='http://virtualtranscanada.com/resources/swimming24px.png'></td><td class='monthlogcells tabletotalheader'>Total</td></tr>"; 
  for(var i = 0 ; i < 12 ; i++){
    var formatteddata = "<tr class='monthrow'><td class='monthheader'>"+months[i]+"</td>";
    for ( var j = 0 ; j < 4 ; j++){
      formatteddata += "<td class='monthlogcells tablecyclingcontent'>"+data[i][j]+"</td>";
    }
    formatteddata += "</tr>";
    htmltable += formatteddata;
  }
  
  htmltable += "</table>";
  
  document.getElementById(div).innerHTML = htmltable;
}

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

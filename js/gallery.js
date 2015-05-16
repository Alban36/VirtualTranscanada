//Description : function that set available galleries based on current position
function EnableDisableGalleryOptions(){
  	//set option
  	var options = document.getElementById("selection").options;
  	var i = 0;
  	var length = options.length;

  	for(i = 0 ; i<length ; i ++){
    		if(escalenumber < i+1){
      			options[i].disabled=true;
    		}
    		else{
      			options[i].disabled=false;
    		}
  	}
  	document.getElementById("selection").selectedIndex = escalenumber-1;
}

//Description : Display images corresponding to the gallery selected
//Parameter : index of the selected gallery
//Return : the HNL code of the images
function GetGalleryFigures(index){
  	var ressourceurl = "https://0faf07634bd2d47c8375376ca598c8b63ba9dba1.googledrive.com/host/0B0SfnkeFqf8uclVTUlFFYXNxcDQ/";
  	var imgfile = "";
  	var imgtype = ".jpg"
  	var imgcaption = "";
  	var imgnumber = 0;

  	//stjohn's
  	if(index==0){
    		imgfile= "stjohnimg";
    		imgtype=".jpg";
		imgcaption = "St John's, Newfoundland";
    		imgnumber=4;
  	}	
  
  	//Grand Falls
  	if(index==1){
    		imgfile= "grdfallsimg";
    		imgtype=".jpg";
    		imgcaption = "Grand Falls Windsor, Newfoundland";
    		imgnumber=3;
  	}	
  
  	//corner brook
  	if(index==2){
    		imgfile= "cornerbrookimg";
    		imgtype=".jpg";
    		imgcaption = "Corner Brook, Newfoundland";
    		imgnumber=5;
  	}	
  
  	//generate figures
  	var imagecontent = "";
  
  	if(imgnumber>0){
    		for(var i = 1 ; i<=imgnumber ; i++){
      			imagecontent = imagecontent + "<figure><img src=\""+ressourceurl+imgfile+i+imgtype+"\" width='100%'/><figcaption>"+imgcaption+"</figcaption></figure>";
    		}		
  	} 
  	return imagecontent;
}

//Description : Set image gallery in imagegallery div
function setImageGallery()
{
  	var selectedelement = document.getElementById("selection").selectedIndex;
  
  	var gallery = GetGalleryFigures(selectedelement);
  	if(gallery != ""){
    		document.getElementById("imagegallery").innerHTML = gallery;
    		makeBSS('.demo1', opts);
	}
}



//Description : Refresh map data
function RefreshMap(localisation){
	deleteMarkers(localisation.markers);

	if(localisation.panorama != null)
	{
		localisation.panorama.setVisible(false);
	}

	var coord = new google.maps.LatLng(localisation.lat, localisation.long);
	localisation.map.setCenter(coord);
	localisation.map.setZoom(10);
	addMarker(localisation.map, coord, localisation.markers);
}

//Description : callback to change icon when map is enlarged or reduced.
function enlargeImg(){
 if(!largeImg)
 {
   largeImg = true;
   document.getElementById("buttonEnlarge").src = 'http://virtualtranscanada.com/resources/arrow_2.png';
 }
 else
 {
   largeImg= false;
   document.getElementById("buttonEnlarge").src = 'http://virtualtranscanada.com/resources/arrow_1.png';
 }
}

//Description : Callback to set map to account current position.
function setToMyPosition(localisation) {
    localisation.map.setCenter(new google.maps.LatLng(localisation.lat, localisation.long));
    localisation.map.setZoom(10);
}

//Description : Callback to set map to streetview of account position.
function setToMyStreetPosition(localisation) {
  var streetViewMaxDistance = 50;          

  var point = new google.maps.LatLng(localisation.lat, localisation.long);
  var prevpoint = new google.maps.LatLng(localisation.prevlat, localisation.prevlong);
   
  var streetViewService = new google.maps.StreetViewService();
  localisation.panorama = localisation.map.getStreetView();

  streetViewService.getPanoramaByLocation(point, streetViewMaxDistance, function (streetViewPanoramaData, status) {
    if(status == google.maps.StreetViewStatus.OK){
      var oldPoint = point;
      point = streetViewPanoramaData.location.latLng;

      var heading = google.maps.geometry.spherical.computeHeading(prevpoint,point);            

      localisation.panorama.setPosition(point);
      localisation.panorama.setPov({
        heading: heading,
        zoom: 1,
        pitch: 0
      });
      localisation.panorama.setVisible(true);
    }
  });
}  

//Description : Callback to set map to overview of the transcanada
function setToGlobal(map) {
  map.setCenter(new google.maps.LatLng(49.886083, -90.152921));
  if(largeImg)
  {
    map.setZoom(4);
  }
  else
  {
    map.setZoom(3);
  }
}

//Description : function that create a button control for map
//parameter :
//  ControlDiv is the div to add the control
//  Map is the dynamic map that will have this control
//  text is the text on the control
//  title is the text to display when hanging over control
//  func is a callback function which is executed when control is clicked
function Control(controlDiv, map, text, title, func) {
  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '10px';
  controlUI.style.marginLeft = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = title;
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '14px';
  controlText.style.lineHeight = '20px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = text;
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  google.maps.event.addDomListener(controlUI, 'click', func);
}

//Description : change img source to a black arrow
function BlackArrow(){
  if(largeImg){
    document.getElementById("arrow_2_black").style.display="inline";
    document.getElementById("arrow_2_gray").style.display="none";
    document.getElementById("arrow_1_black").style.display="none";
    document.getElementById("arrow_1_gray").style.display="none";
  }
  else{
    document.getElementById("arrow_1_black").style.display="inline";
    document.getElementById("arrow_1_gray").style.display="none";
    document.getElementById("arrow_2_black").style.display="none";
    document.getElementById("arrow_2_gray").style.display="none";
  }
}

//Description : change img source to a gray arrow
function GrayArrow(){
  if(largeImg){
    document.getElementById("arrow_2_black").style.display="none";
    document.getElementById("arrow_2_gray").style.display="inline";
    document.getElementById("arrow_1_black").style.display="none";
    document.getElementById("arrow_1_gray").style.display="none";
  }
  else{
    document.getElementById("arrow_1_black").style.display="none";
    document.getElementById("arrow_1_gray").style.display="inline";
    document.getElementById("arrow_2_black").style.display="none";
    document.getElementById("arrow_2_gray").style.display="none";
  }
}

//Description : function that create a control for an image for map
//parameter :
//  ControlDiv is the div to add the control
//  Map is the dynamic map that will have this control
//  html is the html code to put on the control
//  title is the text to display when hanging over control
//  func is a callback function which is executed when control is clicked
function ControlArrow(controlDiv, map, html, title, func, funcover, funcout) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '10px';
  controlUI.style.marginRight = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.style.width = '32px';
  controlUI.style.height = '32px';
  controlUI.title = title;
  controlUI.innerHTML = html;
  controlDiv.appendChild(controlUI);

  // Setup the click event listeners: simply set the map to
  google.maps.event.addDomListener(controlUI, 'click', func);
  google.maps.event.addDomListener(controlUI, 'mouseover', funcover);
  google.maps.event.addDomListener(controlUI, 'mouseout', funcout);
  
}

//Description : Add a marker to the map and push to the array.
function addMarker(map, location, markers) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

//Description : Sets the map on all markers in the array.
function setAllMap(map,markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//Description : Removes the markers from the map, but keeps them in the array.
function clearMarkers(markers) {
  setAllMap(null,markers);
}

//Description : Deletes all markers in the array by removing references to them.
function deleteMarkers(markers) {
  clearMarkers(markers);
  markers = [];
}

//Description : Callback that will toggle map size
function enlargeDiminishMap(){
  $(".dynamicmap").toggleClass("dynamicmapchange");
  enlargeImg();
}
 
//Description : Callback function that refresh map on resize.
function TriggerMapResize(map) { 
  google.maps.event.trigger(map, "resize");
}

//Description : Create text button my position on map
function addMyPositionButton(localisation,div){
  var label = "My position";
  var description = "Click to center map on your position";
  var centerControl = new Control(div, localisation.map, label, description, function(){setToMyPosition(localisation);});
}

//Description : Create text button street view on map
function addStreetViewButton(localisation,div){
var label = "Street view";
  var description = "Click to view your position on street view";
  var centerControl = new Control(div, localisation.map, label, description, function(){setToMyStreetPosition(localisation);});
}

//Description : Create text button global position on map
function addGlobalPositionButton(map,div){
 var label = "Overview";
  var description = "Click to see an overview of the transCanada";
  var centerControl = new Control(div, map, label, description, function(){setToGlobal(map)});
}

//Description : Create control arrow to enlarge and diminish the map
function addEnlargeOrReduceMapButton(map,div){
var label = "<div id='buttonEnlarge'><img id='arrow_1_gray' style='width:32px;height:32px;' src='http://virtualtranscanada.com/resources/arrow_1.png'><img id='arrow_1_black' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_1_black.png'><img id='arrow_2_gray' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_2.png'><img id='arrow_2_black' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_2_black.png'></div>";
  var description = "Click to enlarge or reduce the map";
  var centerControl = new ControlArrow(div, map, label, description, enlargeDiminishMap, BlackArrow, GrayArrow);
   
}

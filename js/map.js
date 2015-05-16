//Description : Refresh map data
function RefreshMap(latforurl ,longforurl){
	var latitude = latforurl;
	var longitude = lonforurl;

	deleteMarkers();

	if(panorama != null)
	{
		panorama.setVisible(false);
	}

	var coord = new google.maps.LatLng(latitude, longitude);
	map.setCenter(coord);
	map.setZoom(10);
	addMarker(coord);
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
var mypos = function setToMyPosition() {
    map.setCenter(new google.maps.LatLng(latforurl, lonforurl));
    map.setZoom(10);
  }

//Description : Callback to set map to streetview of account position.
var streetpos = function setToMyStreetPosition() {
  var streetViewMaxDistance = 50;          

  point = new google.maps.LatLng(latforurl, lonforurl);
  prevpoint = new google.maps.LatLng(prevlatforurl, prevlonforurl);
   
  var streetViewService = new google.maps.StreetViewService();
  panorama = map.getStreetView();

  streetViewService.getPanoramaByLocation(point, streetViewMaxDistance, function (streetViewPanoramaData, status) {
    if(status == google.maps.StreetViewStatus.OK){
      var oldPoint = point;
      point = streetViewPanoramaData.location.latLng;

      var heading = google.maps.geometry.spherical.computeHeading(prevpoint,point);            

      panorama.setPosition(point);
      panorama.setPov({
        heading: heading,
        zoom: 1,
        pitch: 0
      });
      panorama.setVisible(true);
    }
  });
}  

//Description : Callback to set map to overview of the transcanada
var globalpos = function setToGlobal() {
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

//Description : function that init dynamic map
function initialize() {
  var fillArray = ['red', 'blue', 'yellow', 'green'];

  var mapOptions = {
    center: new google.maps.LatLng(<?= lat ?>, <?= lon ?>),
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var layer = new google.maps.visualization.DynamicMapsEngineLayer({
    layerId: '06673056454046135537-08896501997766553811',
    map: map,
    suppressInfoWindows: true,
    clickable: false
  });
  
  google.maps.event.addDomListener(window, "resize", function() {
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
   });
   
   var centerControlDiv = document.createElement('div');
   var centerControl = new Control(centerControlDiv, map, "My position", "Click to center map on your position", mypos);
   
   var centerControl2 = new Control(centerControlDiv, map, "Street view", "Click to view your position on street view", streetpos);
   
   var centerControl3 = new Control(centerControlDiv, map, "Overview", "Click to see an overview of the transCanada", globalpos);
   
   var centerControlDiv2 = document.createElement('div');
   var centerControl4 = new ControlArrow(centerControlDiv2, map, "<div id='buttonEnlarge'><img id='arrow_1_gray' style='width:32px;height:32px;' src='http://virtualtranscanada.com/resources/arrow_1.png'><img id='arrow_1_black' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_1_black.png'><img id='arrow_2_gray' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_2.png'><img id='arrow_2_black' style='width:32px;height:32px;display:none;' src='http://virtualtranscanada.com/resources/arrow_2_black.png'></div>", "Click to enlarge or reduce the map", enlargemap, BlackArrow, GrayArrow);
   
   
   centerControlDiv.index = 1;
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
   
   centerControlDiv2.index = 1;
   map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv2);
   
   //Add kml layer on the map
   var KmlLayer = new google.maps.KmlLayer({
     url: 'http://virtualtranscanada.com/resources/Transcanada.kml',
     preserveViewport: true,
   });
   KmlLayer.setMap(map);
   
   addMarker(new google.maps.LatLng(latforurl, lonforurl));
}

//Description : Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

//Description : Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//Description : Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

//Description : Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

//Description : Callback that will toggle map size
var enlargemap = function enlargeDiminishMap(){
  $(".dynamicmap").toggleClass("dynamicmapchange");
  enlargeImg();
}
 
//Description : Callback function that refresh map on resize.
function TriggerMapResize() { 
  document.getElementById("debug").innerHTML = "In TriggerMapResize";
  google.maps.event.trigger(map, "resize");
}


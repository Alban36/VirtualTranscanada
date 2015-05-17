/*
in gallery.js*/

//Description : function that set available galleries based on current position
function EnableDisableGalleryOptions(id,stopnumber){
  //set option
  var options = document.getElementById(id).options;
  var i = 0;
  var length = options.length;

  for(i = 0 ; i<length ; i ++)
  {
    if(stopnumber < i+1)
    {
      options[i].disabled=true;
    }
    else
    {
      options[i].disabled=false;
    }
  }
  document.getElementById(id).selectedIndex = stopnumber-1;
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
  if(index==0)
  {
    imgfile= "stjohnimg";
    imgtype=".jpg";
    imgcaption = "St John's, Newfoundland";
    imgnumber=4;
  }
  
  //Grand Falls
  if(index==1)
  {
    imgfile= "grdfallsimg";
    imgtype=".jpg";
    imgcaption = "Grand Falls Windsor, Newfoundland";
    imgnumber=3;
  }
  
  //corner brook
  if(index==2)
  {
    imgfile= "cornerbrookimg";
    imgtype=".jpg";
    imgcaption = "Corner Brook, Newfoundland";
    imgnumber=5;
  }
  
  //generate figures
  var imagecontent = "";
  
  if(imgnumber>0)
  {
    for(var i = 1 ; i<=imgnumber ; i++)
    {
      imagecontent = imagecontent + "<figure><img src=\""+ressourceurl+imgfile+i+imgtype+"\" width='100%'/><figcaption>"+imgcaption+"</figcaption></figure>";
    }
  } 
  return imagecontent;
}

//Description : Set image gallery in imagegallery div
function setImageGallery(id_selection,id_imagegallery)
{
  var selectedelement = document.getElementById(id_selection).selectedIndex;
  
  var gallery = GetGalleryFigures(selectedelement);
  if(gallery != "")
  {
    document.getElementById(id_imagegallery).innerHTML = gallery;
    //makeBSS('.demo1', opts);
  }
}

var makeBSS = function (el, options) {
        var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
        $slideshow = {},
        Slideshow = {
            init: function (el, options) {
                this.counter = 0; // to keep track of current slide
                this.el = el; // current slideshow container    
                this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
                this.numItems = this.$items.length; // total number of slides
                options = options || {}; // if options object not passed in, then set to empty object 
                options.auto = options.auto || false; // if options.auto object not passed in, then set to false
                this.opts = {
                    auto: (typeof options.auto === "undefined") ? false : options.auto,
                    speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
                    pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
                    fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
                };
                
                this.$items[0].classList.add('bss-show'); // add show class to first figure 
                this.injectControls(el);
                this.addEventListeners(el);
                if (this.opts.auto) {
                    this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
                }
                if (this.opts.fullScreen) {
                    this.addFullScreen(this.el);
                }
            },
            showCurrent: function (i) {
                // increment or decrement this.counter depending on whether i === 1 or i === -1
                if (i > 0) {
                    this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                } else {
                    this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                }

                // remove .show from whichever element currently has it 
                // http://stackoverflow.com/a/16053538/2006057
                [].forEach.call(this.$items, function (el) {
                    el.classList.remove('bss-show');
                });
  
                // add .show to the one item that's supposed to have it
                this.$items[this.counter].classList.add('bss-show');
            },
            injectControls: function (el) {
            // build and inject prev/next controls
                // first create all the new elements
                var spanPrev = document.createElement("span"),
                    spanNext = document.createElement("span"),
                    docFrag = document.createDocumentFragment();
        
                // add classes
                spanPrev.classList.add('bss-prev');
                spanNext.classList.add('bss-next');
        
                // add contents
                spanPrev.innerHTML = '&laquo;';
                spanNext.innerHTML = '&raquo;';
                
                // append elements to fragment, then append fragment to DOM
                docFrag.appendChild(spanPrev);
                docFrag.appendChild(spanNext);
                el.appendChild(docFrag);
            },
            addEventListeners: function (el) {
                var that = this;
                el.querySelector('.bss-next').addEventListener('click', function () {
                    that.showCurrent(1); // increment & show
                }, false);
            
                el.querySelector('.bss-prev').addEventListener('click', function () {
                    that.showCurrent(-1); // decrement & show
                }, false);
                
                el.onkeydown = function (e) {
                    e = e || window.event;
                    if (e.keyCode === 37) {
                        that.showCurrent(-1); // decrement & show
                    } else if (e.keyCode === 39) {
                        that.showCurrent(1); // increment & show
                    }
                };
            },
            autoCycle: function (el, speed, pauseOnHover) {
                var that = this,
                    interval = window.setInterval(function () {
                        that.showCurrent(1); // increment & show
                    }, speed);
                
                if (pauseOnHover) {
                    el.addEventListener('mouseover', function () {
                        interval = clearInterval(interval);
                    }, false);
                    el.addEventListener('mouseout', function () {
                        interval = window.setInterval(function () {
                            that.showCurrent(1); // increment & show
                        }, speed);
                    }, false);
                } // end pauseonhover
                
            },
            addFullScreen: function(el){
                var that = this,
                fsControl = document.createElement("span");
                
                fsControl.classList.add('bss-fullscreen');
                el.appendChild(fsControl);
                el.querySelector('.bss-fullscreen').addEventListener('click', function () {
                    that.toggleFullScreen(el);
                }, false);
            },
            toggleFullScreen: function(el){
                debugger;
                if (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement &&   
                    !document.msFullscreenElement ) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                      el.requestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                      el.msRequestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                      el.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                      el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    }
                }
            } // end toggleFullScreen
            
        }; // end Slideshow object 
        
    // make instances of Slideshow as needed
    [].forEach.call($slideshows, function (el) {
        $slideshow = Object.create(Slideshow);
        $slideshow.init(el, options);
    });
    };

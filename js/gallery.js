// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function swapPhoto() 
{
	document.getElementById('photo').src = mImages[0];
	console.log('swap photo');
}

var mImages = [];
// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		mJson = JSON.parse(mRequest.responseText);
		iterateJSON(mJson);
	}
  };
  mRequest.open("GET", mUrl, true);
  mRequest.send();

// Array holding GalleryImage objects (see below).
var mRequest = new XMLHttpRequest();

// Holds the retrived JSON information
var mJson;

var mURl = "images.json"

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	this.location ="";
	this.descritption = "";
	this.date=  "";
	this.img= " ";//(bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}

function iterateJSON(mJson)
{
for( x= 0; x < mJson.images.length; x++)
{
	mImages[x]= new GalleryImage();
	mImages[x].location = mjson.images[x].imgLocation;
	mImages[x].description = mJson.images[x].imgLocation;
	mImages[x].img = mJson.images[x].imgPath;
}
}
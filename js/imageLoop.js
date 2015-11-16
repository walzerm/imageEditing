//Run this on python -m SimpleHTTPServer to avoid security issues with the image

$(document).ready(function() {   
	function createCanvas() {
		//Select the canvas
        var canvas = document.getElementById("myCanvas");
        //Get the 2D context
        var context = canvas.getContext("2d");
        //Add the image
        var image = new Image();
    	image.src="rainier.jpg"

        //Load the image into the canvas
        $(image).load(function() {
        	var ratio = 1;
        	var height = image.naturalHeight;
        	var width = image.naturalWidth;
        	//Adjust the ratio of the image to fit the canvas
        	if (height > 500 || width > 500) {
        		ratio = 500 / Math.max(height, width);
        	}
        	context.drawImage(image, 0, 0, (width * ratio), (height * ratio));

        	//Add a filter (practice)
        	changePicture();
        });

	};

	function changePicture() {
		var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        //Get the pixel array from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    	var pixels = imageData.data;

    	//loop through the pixels, each pixel has 4 values in the array, hence the += 4
    	//Create an inverese color effect by subtracting the current color value from 255
		for(var i = 0; i < pixels.length; i += 4) {
        	pixels[i] = 255-pixels[i];
        	pixels[i + 1] = 255-pixels[i + 1];
        	pixels[i + 2] = 255-pixels[i + 2];
    	}

        //Redraw the image at the same coordinates
        context.putImageData(imageData,0,0);
	}
	
	createCanvas();

});
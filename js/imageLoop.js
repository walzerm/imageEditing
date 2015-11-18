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
        	$("#invert").on("click", function() {
        		invertColors();
        	});
            $("#greyscale").on("click", function() {
                greyscale();
            });
            $("#negative").on("click", function() {
                invertColors();
                greyscale();
            });
            $("#kernel").on("click", function() {
                kernelFilter();
            })
        	
        });

	};

	function invertColors() {
		var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        //Get the pixel array from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    	var pixels = imageData.data;

    	//loop through the pixels, each pixel has 4 values in the array, hence the += 4
    	//Create an inverese color effect by subtracting the current color value from 255
		for(var i = 0; i < pixels.length; i += 4) {
        	pixels[i] = 255-pixels[i]; //red
        	pixels[i + 1] = 255-pixels[i + 1]; //green
        	pixels[i + 2] = 255-pixels[i + 2]; //blue
    	}

        //Redraw the image at the same coordinates
        context.putImageData(imageData,0,0);
	}

    function greyscale() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        //Get the pixel array from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;

        //loop through the pixels, each pixel has 4 values in the array, hence the += 4
        for(var i = 0; i < pixels.length; i += 4) {
            //uses the luma equation to set each color to greyscale
            var brightness = 0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2];
            pixels[i] = brightness; //red
            pixels[i + 1] = brightness; //green
            pixels[i + 2] = brightness; //blue
        }

        //Redraw the image at the same coordinates
        context.putImageData(imageData,0,0);
    }
    function kernelFilter() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        //Get the pixel array from the canvas
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        console.log(pixels);
        //describes a sorbel edge dection filter
        var outlineKernel = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
        //set a variable "row" to define the row of pixels in the canvas
        var row = canvas.width * 4;
        //loops through the rows in the canvas
        for (var i = 0; i < pixels.length; i += row) {
            //parses the pixels in each row
            for (var j = 0; j < row; j += 4) {
                console.log("==========");
                console.log(i);
                console.log(j);
                var adjustedRed = 0;
                var adjustedGreen = 0;
                var adjustedBlue = 0;
                //loops through each row in the kernel matrix
                for (var k = 0; k < outlineKernel.length; k++) {
                    for (var l = 0; l < outlineKernel[k].length; l++) {
                        var newI = i + (k - Math.floor(outlineKernel.length / 2));
                        var newJ = j + (l - Math.floor(outlineKernel[k].length / 2));
                        console.log(newI);
                        console.log(newJ);


                    }
                }
            }
        }
    }
	
	createCanvas();

});
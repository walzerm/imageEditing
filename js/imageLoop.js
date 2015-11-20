//Run this on python -m SimpleHTTPServer to avoid security issues with the image

$(document).ready(function() {  

    function whenClicked() {
        $("#load-pic").on("click", function() {
            createCanvas();
        });
        //check for user image upload
        $("#file-input").on("change", addUserImage);
        
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
        });
    }

    function addUserImage(e) {
        //Select the canvas
        var canvas = document.getElementById("myCanvas");
        //Get the 2D context
        var context = canvas.getContext("2d");
        //created a file reader
        var reader = new FileReader();
        reader.onload = function(e){
            var image = new Image();
            image.onload = function(){
                var ratio = 1;
                var height = image.naturalHeight;
                var width = image.naturalWidth;
                //Adjust the ratio of the image to fit the canvas
                if (height > 500 || width > 500) {
                    ratio = 500 / Math.max(height, width);
                }
                context.drawImage(image,0,0,(width * ratio), (height * ratio));
            }
            image.src = e.target.result;
        }
    reader.readAsDataURL(e.target.files[0]);     
    }


        
    

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

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        //create a new, empty image used to make the edited picture
        var newImage = context.createImageData(canvas.width, canvas.height);
        var newPixels = newImage.data;
        //various kernel matrices 
        var blurKernel = [[0.0625, 0.125, 0.0625], [0.125, 0.25, 0.125], [0.0625, 0.125, 0.0625]];
        var edgeKernel = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
        var sharpenKernel = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
        //the width of the image, used to manipulate the one demensional array
        var row = canvas.width * 4;
        //looping though the source array of pixels
        for (var pix = 0; pix <= pixels.length; pix+=4) {
            //temporary RGB variables to hold the edited pixel data
            var tempR = tempG = tempB = 0;
            //nested loops to naviage the two dimensional kernel array
            for (var y = -1; y <= 1; y++) {
                for (var x = -1; x <= 1; x++) {
                    //variable for finding the pixel to be manipulated in relation to the kernel position
                    var tempPix = pix + (row * y) + (x * 4);
                    //if statement to handle edge cases
                    if (pixels[tempPix] === undefined) {
                        continue;
                    }
                    //adding the accumulated RGB values for the target pixel
                    tempR += pixels[tempPix] * edgeKernel[y + 1][x + 1];
                    tempG += pixels[tempPix + 1] * edgeKernel[y + 1][x + 1];
                    tempB += pixels[tempPix + 2] * edgeKernel[y + 1][x + 1];
                }
            }
            //creating the new image with the edited pixel data
            newPixels[pix] = tempR;
            newPixels[pix + 1] = tempG;
            newPixels[pix + 2] = tempB;
            newPixels[pix + 3] = 255; //for the alpha chanel 
        }
        //placing the new image onto the canvas, over the old image
        context.putImageData(newImage, 0, 0);
    }
    
	
	whenClicked();

});
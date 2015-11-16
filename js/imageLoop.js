$(document).ready(function() {   
	function createCanvas() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.src = "rainier.jpg";
        $(image).load(function() {
        	var ratio = 1;
        	var height = image.naturalHeight;
        	var width = image.naturalWidth;
        	if (height > 500 || width > 500) {
        		ratio = 500 / Math.max(height, width);
        	}
        	ctx.drawImage(image, 0, 0, (width * ratio), (height * ratio));
        });
	};
	
	createCanvas();
});
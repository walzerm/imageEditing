

$(document).ready(function() {
	$("#file-input").on("change", function() {
		var imageFile = (this.files);
		var objectURL = window.URL.createObjectURL(imageFile[0]);
		console.log(objectURL);
		var image = new Image();
		image.src = objectURL;
		imgData = getBase64Image(image);

		localStorage.setItem("imgData", imgData);
	});
	

	

});

function addUserImage(e) {
	var reader = new FileReader();

    reader.onload = function (e) {
        
    }

    userImage = reader.readAsDataURL(e.target.files[0]);
    console.log(userImage);
    
	imgData = getBase64Image(userImage);

	localStorage.setItem("imgData", imgData);

}


 /* var reader = new FileReader();
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
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            context.drawImage(image,0,0,(width * ratio), (height * ratio));
        }
        image.src = e.target.result;
        CURRENT_IMAGE  = image.src;
        
    }
    reader.readAsDataURL(e.target.files[0]);*/

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext("2d");
    debugger;
    context.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
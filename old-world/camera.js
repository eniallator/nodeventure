item('home', 'camera', {
	respawnTime: 50,
	short: 'a camera',
	image: '',
	description: 'A camera to take some selfies, as the cool kids say'
});


itemCommand('use', 'camera', function(rest, player, item, game){
	
	player.write("Say Cheese! 3, 2, 1...");

	player.display.eval(function(){
	   
		var videoBox = document.createElement('video');
		videoBox.setAttribute('id', 'camera');
		videoBox.setAttribute('autoplay', '');
		videoBox.style.position = 'absolute';
		videoBox.width = 640;
		videoBox.height = 480;
		videoBox.style.zIndex = '10';
		document.body.insertBefore(videoBox, document.body.firstChild);

		var snapshotCanvas = document.createElement('canvas');
		snapshotCanvas.setAttribute('id', 'snapshot');
		snapshotCanvas.width = 320;
		snapshotCanvas.height = 240;
		snapshotCanvas.style.display = 'none';
		document.body.appendChild(snapshotCanvas);

		navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

		// Check that the browser supports getUserMedia.
		// If it doesn't show an alert, otherwise continue.
		if (navigator.getMedia) {
			// Request the camera.
			navigator.getMedia(
				// Constraints
				{
					video: true
				},

				// Success Callback
				function(localMediaStream) {
					// Get a reference to the video element on the page.
					var vid = document.getElementById('camera');

					// Create an object URL for the video stream and use this 
					// to set the video source.
					vid.src = window.URL.createObjectURL(localMediaStream);

					setTimeout(function() {
						var video = document.getElementById('camera');
						var canvas = document.getElementById('snapshot');
						canvas.getContext('2d').drawImage(video, 0, 0, 640, 480, 0, 0, 320, 240);
						var img = canvas.toDataURL('image/png');
						
						document.body.removeChild(video);
						document.body.removeChild(canvas);

						// And create something to put the image in
						var videoBox = document.createElement('img');
						videoBox.setAttribute('src', img);
						videoBox.style.position = 'absolute';
						videoBox.style.top = '50%';
						videoBox.style.zIndex = '5';
						document.body.insertBefore(videoBox, document.body.firstChild);
					}, 3000);
				},

				// Error Callback
				function(err) {
				// Log the error to the console.
					console.log('The following error occurred when trying to use getUserMedia: ' + err);
				}
			);
		} else {
			alert('Sorry, your browser does not support getUserMedia');
		}
	   
	}, { data: [1, 2, 3] });
	
});
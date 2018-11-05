const electron = window.require('electron')
const WebCamera = window.require("webcamjs")
const { remote } = electron
const desktopCapturer = electron.desktopCapturer;

desktopCapturer.getSources({types: ['window', 'screen']}, (err, sources) =>{

	remote.require('fs-extra')
		.outputFile(
			// screen name
			`./src/aaa/${Date.now()}.png`,
			// screen-file value
			sources[0].thumbnail.toPNG(),
			// screen creation cb
			() => console.log('screnshoooooooooot'))
} )

export default function(delay) {
		const	timer = setInterval(
			() => {
				makeWebShot()
				makeScreenShot()
			},
			delay
	)
	return timer
}

function makeWebShot() {
	if(!WebCamera.loaded) {
		WebCamera.attach('#camera')
		throw('Camera is not loaded yet')
	}

	WebCamera.snap( data => {
		var imageBuffer = processBase64Image(data);

    remote.require('fs-extra')
      .outputFile(
        // screen name
        `./src/webshots/${Date.now()}.jpg`,
        // screen-file value
        imageBuffer.data,
        // screen creation cb
        () => console.log('webshoooot'))

		function processBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      	, response = {};

      if (matches.length !== 3) {
          return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');

      return response;
		}
	})
}

function makeScreenShot() {
  remote.getCurrentWindow().capturePage(img => {
    remote.require('fs-extra')
      .outputFile(
        // screen name
        `./src/screenshots/${Date.now()}.png`,
        // screen-file value
        img.toPNG(),
        // screen creation cb
        () => console.log('screnshoooooooooot'))
  })
}

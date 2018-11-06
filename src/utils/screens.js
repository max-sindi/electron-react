import config from './config'
const electron = window.require('electron')
const WebCamera = window.require("webcamjs")
const { remote } = electron
const desktopCapturer = electron.desktopCapturer
const { width, height } = electron.screen.getAllDisplays()[0].size

WebCamera.on( 'error', function(err) {
	console.log('camera error')
});

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
		return
	}

	WebCamera.snap( data => {
		var imageBuffer = processBase64Image(data);

    remote.require('fs-extra')
      .outputFile(
        // screen name
        `./src/${config.webshotsFolderName}/${Date.now()}.png`,
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
	desktopCapturer.getSources({ types: ['window', 'screen'], thumbnailSize: { width, height, }}, (err, sources) => {
		remote.require('fs-extra')
			.outputFile(
				// screen name
				`./src/${config.screenshotsFolderName}/${Date.now()}.png`,
				// screen-file value
				sources[0].thumbnail.toPNG(),
				// screen creation cb
				() => console.log('screnshoooooooooot')
			)
	})
}

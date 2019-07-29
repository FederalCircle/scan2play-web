import JsQR from 'jsqr'

/**
 * @see https://github.com/cozmo/jsQR/blob/master/docs/index.html
 */
export async function init(videoSelector = 'video') {
  const mediaConstraints = {
    video: {
      facingMode: 'environment', // Front camera
    }
  }

  // Get user webcam stream
  let stream
  try {
    stream = await navigator
      .mediaDevices
      .getUserMedia(mediaConstraints)
    console.log('userMediaStream', stream)
  } catch (err) {
    console.error(new Error(err))
  }

  // Render the stream in a video element
  const video = document.querySelector(videoSelector)
  if (video) {
    video.srcObject = stream
  } else {
    console.error(new Error('No video element was found!'))
  }

  // Stream tick function handler
  requestAnimationFrame(_tick(video, null))
}

function _tick(video, prevCanvas) {
  return () => {
    let canvas
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const {
        videoWidth: width,
        videoHeight: height,
      } = video
  
      // Retrieve the canvas from previous tick or creates a new one
      canvas = (
        prevCanvas || _createCanvas(width, height)
      )
  
      // Get a video frame as an ImageData object
      canvas.drawImage(video, 0, 0, width, height)
      var imageData = canvas.getImageData(0, 0, width, height)
  
      // Try to identify a QR Code in the video snapshot
      var code = JsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      })

      console.log('qrCode', code)
      if (code) {
        alert(code.data)
      }
    }

    // Request next tick
    requestAnimationFrame(_tick(video, canvas))
  }
}

function _createCanvas(width, height) {
  let canvas = document.getElementById('qrCanvas')
  if (!canvas) {
    canvas = document.createElement("canvas")
  
    canvas.id = 'qrCanvas'
    canvas.width = width
    canvas.height = height
    canvas.hidden = true
    document.body.appendChild(canvas)
  }

  return canvas.getContext("2d")
}

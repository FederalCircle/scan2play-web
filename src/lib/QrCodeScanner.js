import JsQR from 'jsqr'

/**
 * @see https://github.com/cozmo/jsQR/blob/master/docs/index.html
 */
class QrCodeScanner {
  canvas = null

  video = null

  constructor(canvasSelector = 'canvas') {
    // Get the canvas DOM reference
    this.canvas = document.querySelector(canvasSelector)

    // Creates a video element to receive webcam stream
    this.video = document.createElement('video')
    this.video.setAttribute('playsinline', true)
  }

  async init() {
    // Get webcam stream
    const stream = await this.requestUserMedia()

    // Render the stream in a video element
    this.video.srcObject = stream
    this.video.play()

    // Stream tick function handler
    requestAnimationFrame(this.tick.bind(this))
  }

  async requestUserMedia() {
    const mediaConstraints = {
      video: {
        facingMode: 'environment', // Front camera
      }
    }

    let stream
    try {
      stream = await navigator
        .mediaDevices
        .getUserMedia(mediaConstraints)
      console.log('userMediaStream', stream)
    } catch (err) {
      console.error(new Error(err))
    }

    return stream
  }

  tick() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      const {
        videoWidth: width,
        videoHeight: height,
      } = this.video

      this.canvas.height = height
      this.canvas.width = width

      const ctx = this.canvas.getContext("2d")

      // Get a video frame as an ImageData object
      ctx.drawImage(this.video, 0, 0, width, height)
      var imageData = ctx.getImageData(0, 0, width, height)
  
      // Try to identify a QR Code in the video snapshot
      var code = JsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      })

      console.log('qrCode', code)
      if (code) {
        alert(code.data)
      }
    }
    requestAnimationFrame(this.tick.bind(this))
  }
}

export default QrCodeScanner

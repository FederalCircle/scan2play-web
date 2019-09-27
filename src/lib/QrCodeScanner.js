import JsQR from 'jsqr'
import throttle from 'lodash.throttle'

/**
 * Scanner used to render user media devices on a canvas element and find
 * QR Codes in the video stream.
 * @see https://github.com/cozmo/jsQR/blob/master/docs/index.html
 */
class QrCodeScanner {
  /**
   * Canvas DOM element to render video frames
   * @type {DOMElement}
   */
  canvas = null

  /**
   * Video element created to stream user media device
   * @type {DOMElement}
   */
  video = null

  /**
   * Config object used across methods
   * @type {Object}
   * @prop {number} successThrottle - Time to throttle success callback
   */
  config = {
    successThrottle: 300,
  }

  /**
   * Callback function for QR Code match
   * @type {Function}
   */
  onSuccess = () => {}

  /**
   * @param {string} canvasSelector - String used to find canvas DOM reference
   * @param {Function} onSuccess - Callback function for QR Code match. The
   * function will be throttled.
   * @param {Object} [customConfig] - Object used to overwrite default config
   */
  constructor(canvasSelector = 'canvas', onSuccess, customConfig = {}) {
    this.config = {
      ...this.config,
      ...customConfig,
    }

    this.onSuccess = throttle(
      onSuccess,
      this.config.successThrottle,
      { trailing: false },
    )

    // Get the canvas DOM reference
    this.canvas = document.querySelector(canvasSelector)

    // Creates a video element to receive webcam stream
    this.video = document.createElement('video')
    this.video.setAttribute('playsinline', true)
  }

  /**
   * Start the video stream rendered in a canvas element, as well as QR Code
   * pattern search.
   */
  async start() {
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
    } catch (err) {
      console.error(new Error(err))
      switch (err.name) {
        case 'NotAllowedError':
          return alert('We need access to your device camera')
        default:
          return alert('Something wrong happened :(')
      }
    }

    return stream
  }

  tick() {
    if (!this.video) return
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      const {
        videoWidth: width,
        videoHeight: height,
      } = this.video

      if (this.canvas.height) this.canvas.height = height
      if (this.canvas.width) this.canvas.width = width

      const ctx = this.canvas.getContext("2d")

      // Get a video frame as an ImageData object
      ctx.drawImage(this.video, 0, 0, width, height)
      var imageData = ctx.getImageData(0, 0, width, height)

      // Try to identify a QR Code in the video snapshot
      var code = JsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      })

      if (code) {
        this.onSuccess(code.data)
      }
    }
    requestAnimationFrame(this.tick.bind(this))
  }

  stop() {
    this.video = null
    this.canvas = null
  }
}

export default QrCodeScanner

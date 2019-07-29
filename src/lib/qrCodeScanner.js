import JsQR from 'jsqr'

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
  const video = document.querySelector(videoSelector);
  if (video) {
    video.srcObject = stream
    // requestAnimationFrame(tick);
  } else {
    console.error(new Error('No video element was found!'))
  }
}
import React from 'react'
import styled from 'styled-components'
// MUI
import Grid from '@material-ui/core/Grid'
// Others
import * as colors from '../constants/colors'
import * as qrCodeScanner from '../lib/qrCodeScanner'
// Assets
import overlayPath from '../assets/overlay.svg'

const Styled = {}
Styled.VideoContainer = styled(Grid)`
  overflow: hidden;
  position: relative;
`
Styled.Overlay = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`

Styled.Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(/static/media/overlay.8ce51b10.svg);
  background-position: center;
  background-size: cover;
`

const Scan = () => {
  React.useEffect(() => {
    qrCodeScanner.init('#video')
  }, [])
  return (
    <Styled.VideoContainer container justify="center">
      <video id="video" autoPlay playsInline />
      <canvas id="qrCanvas" hidden />
      <Styled.Overlay src={overlayPath} />
    </Styled.VideoContainer>
  )
}

export default Scan

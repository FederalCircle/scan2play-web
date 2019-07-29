import React from 'react'
import styled from 'styled-components'
// import JsQR from 'jsqr'
// MUI
import Grid from '@material-ui/core/Grid'
// Others
import * as colors from '../constants/colors'
import * as userMedia from '../lib/userMedia'
// Assets
import overlayPath from '../assets/overlay.svg'

const Styled = {}
Styled.VideoContainer = styled(Grid)`
  overflow: hidden;
  position: relative;
`
Styled.Overlay = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: ${colors.codGray};
  opacity: .2; */
`

const Scan = () => {
  React.useEffect(() => {
    userMedia.initCamera('#video')
  }, [])
  return (
    <Styled.VideoContainer container justify="center">
      <video id="video" autoPlay playsInline />
      <Styled.Overlay src={overlayPath} />
    </Styled.VideoContainer>
  )
}

export default Scan

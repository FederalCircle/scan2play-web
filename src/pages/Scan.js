import React from 'react'
import styled from 'styled-components'
// MUI
import Grid from '@material-ui/core/Grid'
// Others
import QrCodeScanner from '../lib/QrCodeScanner'
// Assets
import overlayPath from '../assets/overlay.svg'

const Styled = {}
Styled.GridWrapper = styled(Grid)`
  overflow: hidden;
  position: relative;
`

Styled.Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${ p => p['data-src'] });
  background-position: center;
  background-size: cover;
`

const Scan = () => {
  const handleScannerSuccess = (code) => {
    console.log('QR Code: ', code)
  }

  React.useEffect(() => {
    const scanner = new QrCodeScanner('#qrCanvas', handleScannerSuccess)
    scanner.init()
  }, [])
  
  return (
    <Styled.GridWrapper
      container
      justify="center"
      alignItems="center"
    >
      <canvas id="qrCanvas" />
      <Styled.Overlay data-src={overlayPath} />
    </Styled.GridWrapper>
  )
}

export default Scan

import React from 'react'
import styled from 'styled-components'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// MUI
import Grid from '@material-ui/core/Grid'
// Others
import QrCodeScanner from '../lib/QrCodeScanner'
import { arcadeOperations } from '../redux/operations'
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

const Scan = ({ history, operations }) => {
  const handleScannerSuccess = (code) => {
    if (code !== 'Scan2Play') return

    console.log('handleScannerSuccess', code)
    operations.insertCoin()
    history.push('/')
    alert('Sua ficha foi inserida, divirta-se! =D')
  }

  React.useEffect(() => {
    const scanner = new QrCodeScanner('#qrCanvas', handleScannerSuccess)

    scanner.start()

    return () => {
      scanner.stop()
    }
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

const mapDispatchToProps = (dispatch) => ({
  operations: bindActionCreators(arcadeOperations, dispatch),
})

export default compose(
  connect(null, mapDispatchToProps),
  withRouter,
)(Scan)

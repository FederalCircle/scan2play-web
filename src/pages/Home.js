import React from 'react'
import styled from 'styled-components'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// Assets
import logo from '../assets/logo.svg'
// Constants
import * as colors from '../constants/colors'
import { arcadeOperations } from '../redux/operations'

const Styled = {}

Styled.GridWrapper = styled(Grid)`
  margin: 8px;
`

Styled.Logo = styled.img`
  width: 100%;
`

Styled.Coins = styled(Typography)`
  && {
    font-family: 'Press Start 2P';
    color: ${colors.white};
  }
`

Styled.Start = styled(Typography)`
  && {
    font-family: 'Press Start 2P';
    color: ${colors.white};
    animation: twinkle 2s infinite;
  }

  @keyframes twinkle {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`

const Home = ({
  history,
  operations,
  coins,
}) => {
  React.useEffect(() => {
    const { disconnect } = operations.connectArcade()

    return () => {
      disconnect()
    }
  }, [])

  console.log(coins)
  return (
    <Styled.GridWrapper
      container
      direction="column"
      justify="center"
      alignItems="center"
      onClick={() => history.push('/scan')}
    >
      <Grid item>
        <Styled.Logo src={logo} alt="Scan2Play logo" />
      </Grid>
      <Grid item>
        <Styled.Coins>{coins} Coins</Styled.Coins>
      </Grid>
      <Grid item>
        <Button color="primary">
          <Styled.Start>Press Start</Styled.Start>
        </Button>
      </Grid>
    </Styled.GridWrapper>
  )
}

const mapStateToProps = (state) => ({
  coins: state.arcade.coins
})

const mapDispatchToProps = (dispatch) => ({
  operations: bindActionCreators(arcadeOperations, dispatch),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Home)

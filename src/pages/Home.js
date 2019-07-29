import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// Assets
import logo from '../assets/logo.svg'
// Constants
import * as colors from '../constants/colors'

const Styled = {}

Styled.Wrapper = styled(Grid)`
  margin: 8px;
`

Styled.Logo = styled.img`
  width: 100%;
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

const Home = ({ history }) => {
  const handleClick = () => {
    history.push('/scan')
  }
  return (
    <Styled.Wrapper
      container 
      direction="column"
      justify="center"
      alignItems="center"
      onClick={handleClick}
    >
      <Grid item>
        <Styled.Logo src={logo} alt="Scan2Play logo" />
      </Grid>
      <Grid item>
        <Button color="primary">
          <Styled.Start>Press Start</Styled.Start>
        </Button>
      </Grid>
    </Styled.Wrapper>
  )
}

export default withRouter(Home)

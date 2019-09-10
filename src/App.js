import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch,  Route } from 'react-router-dom'
// MUI
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
// Custom components
import Scan from './pages/Scan'
import Test from './pages/Test'
import Home from './pages/Home'
// Constants
import * as colors from './constants/colors'

// MUI Theme
const theme = createMuiTheme({
  palette: {
    primary: { main: colors.white },
    secondary: { main: colors.codGray },
  }
})

// Styles
const Styled = {}

Styled.Wrapper = styled(Grid)`
  background-color: ${colors.codGray};
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 6px 3px rgba(0,0,0,.5);
`

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Switch>
            <Route path="/test" component={Test} />
            <Styled.Wrapper container>
                <Route path="/scan" component={Scan} />
                <Route path="/" component={Home} />
            </Styled.Wrapper>
          </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App

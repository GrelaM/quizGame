import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './constants/main-theme-provider'

import './App.css'
import GameStateProvider from './providers/GameStateProvider'

import Menu from './components/Menu'
import StartPage from './pages/StartPage'
import WaitingRoomPage from './pages/WaitingRoomPage'
import GamePage from './pages/GamePage'
import EndGamePage from './pages/EndGamePage'
import Test from './pages/Test'

function App() {
  return (
    <GameStateProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Menu />
            <Switch>
              <Route path="/" exact component={StartPage} />
              <Route path='/waitingroom' component={WaitingRoomPage} />
              <Route path="/game" component={GamePage} />
              <Route path="/result" component={EndGamePage} />
              <Route path="/test" component={Test} />
              <Redirect from="/" to="/" />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </GameStateProvider>
  )
}

export default App

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './constants/main-theme-provider'
import GameStateProvider from './providers/GameStateProvider'
import './App.css'

import Menu from './components/general/Menu'
import StartPage from './pages/StartPage'
import WaitingRoomPage from './pages/singleplayer/WaitingRoomPage'
import SinglePlayerSettings from './pages/singleplayer/SettingsPage'
import GamePage from './pages/singleplayer/GamePage'
import EndGamePage from './pages/singleplayer/EndGamePage'
import RecoveryPage from './pages/singleplayer/RecoveryPage'

import Mode from './pages/multiplayer/Mode'
import HostPage from './pages/multiplayer/HostPage'
import JoinPage from './pages/multiplayer/JoinPage'

import Test from './pages/tests/Test'

function App() {
  return (
    <GameStateProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Menu />
            <Switch>
              <Route path='/' exact component={StartPage} />
              <Route path='/waitingroom' component={WaitingRoomPage} />
              <Route path='/singlegame/settings' component={SinglePlayerSettings} />
              <Route path='/game' component={GamePage} />
              <Route path='/result' component={EndGamePage} />
              <Route path='/singlegame/recovery' component={RecoveryPage} />
              <Route path='/multiplayer/mode' component={Mode} />
              <Route path='/hosting' component={HostPage} />
              <Route path='/join' component={JoinPage} />
              <Route path='/test' component={Test} />
              <Redirect from='/' to='/' />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </GameStateProvider>
  )
}

export default App

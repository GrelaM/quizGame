import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './constants/theme/chakraThemeIndex'

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import GameStateProvider from './providers/GameStateProvider'
import GlobalStateProvider from './providers/GlobalStateProvider'
import './App.css'

import StartPage from './pages/StartPage'
import WaitingRoomPage from './pages/singleplayer/WaitingRoomPage'
import SinglePlayerSettings from './pages/singleplayer/SettingsPage'
import GamePage from './pages/singleplayer/GamePage'
import EndGamePage from './pages/singleplayer/EndGamePage'
import RecoveryPage from './pages/singleplayer/RecoveryPage'

import MultiplayerMode from './pages/multiplayer/MultiplayerMode'
import HostPage from './pages/multiplayer/HostPage'
import JoinPage from './pages/multiplayer/JoinPage'
import MultiplayerGamePage from './pages/multiplayer/MultiplayerGamePage'
import MultiplayerRoom from './pages/multiplayer/MultiplayerRoomPage'

import Test from './pages/tests/Test'

function App() {
  return (
    <GlobalStateProvider>
      <GameStateProvider>
        <ChakraProvider theme={chakraTheme}>
          <BrowserRouter>
            <div className="App">
              <Switch>
                <Route path="/" exact component={StartPage} />
                <Route path="/waitingroom" component={WaitingRoomPage} />
                <Route
                  path="/singlegame/settings"
                  component={SinglePlayerSettings}
                />
                <Route path="/game" component={GamePage} />
                <Route path="/result" component={EndGamePage} />
                <Route path="/singlegame/recovery" component={RecoveryPage} />
                <Route path="/multiplayer/mode" component={MultiplayerMode} />
                <Route
                  path="/hosting/room/:roomId"
                  component={MultiplayerRoom}
                />
                <Route path="/hosting" component={HostPage} />
                <Route path="/join" component={JoinPage} />
                <Route
                  path="/multuplayer/game/:gameid"
                  component={MultiplayerGamePage}
                />
                <Route path="/test" component={Test} />
                <Redirect from="/" to="/" />
              </Switch>
            </div>
          </BrowserRouter>
        </ChakraProvider>
      </GameStateProvider>
    </GlobalStateProvider>
  )
}

export default App

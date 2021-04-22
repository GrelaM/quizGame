import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(62, 228, 0)',
      light: 'rgba(62, 228, 0,0.5)'
    },
    secondary: {
      dark: 'rgb(160, 133, 0)',
      main: 'rgba(255, 158, 0, 1)',
      light: 'rgba(255, 158, 0, 0.5)'
    },
    error: {
      main: 'rgba(209, 9, 9, 0.8)'
    },
    success: {
      main: 'rgba(0, 88, 4,1)'
    },
    text: {
      primary: 'rgba(0,0,0,0.7)',
      secondary: 'rgba(255,255,255,0.75)'
    }
  }
})

export const mainLinearGradient = 'linear-gradient(145deg,#268E00 25%, #3EE400 80%)'

export const gameButtonColors = {
  first: 'rgba(61, 16, 206,1)',
  second: 'rgba(250, 0, 24,1)',
  third: 'rgba(255, 211, 0,1)',
  fourth: 'rgba(40, 229, 0,1)'
}
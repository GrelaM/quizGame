import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  colors: {
    primary: {
      dark: 'rgb(16, 61, 0)',
      main: 'rgb(62, 228, 0)',
      light: 'rgba(62, 228, 0,0.45)',
      gradient: 'linear-gradient(145deg,#268e00 25%, #3EE400 80%)'
    },
    secondary: {
      dark: 'rgb(161, 100, 0)',
      main: 'rgb(255, 158, 0)',
      light: 'rgba(255, 158, 0, 0.5)'
    },
    error: 'rgba(209, 9, 9, 0.8)',
    success: 'rgba(0, 88, 4,1)',
    text: {
      primary: {
        200: 'rgba(0,0,0,0.2)',
        400: 'rgba(0,0,0,0.4)',
        500: 'rgba(0,0,0,0.5)',
        650: 'rgba(0,0,0,0.65)',
        700: 'rgba(0,0,0,0.7)',
        800: 'rgba(0,0,0,0.8)',
        900: 'rgba(0,0,0,0.9)'
      },
      secondary: {
        100: 'rgba(255,255,255,0.1)',
        500: 'rgba(255,255,255,0.5)',
        750: 'rgba(255,255,255,0.75)',
        800: 'rgba(255,255,255,0.8)',
        900: 'rgba(255,255,255,0.9)'
      }
    }
  }
})

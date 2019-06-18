import { createMuiTheme } from '@material-ui/core'
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      orange: '#ff9800',
      gray: '#757575',
      white: '#ffffff',
      lightPurple: '#5c6bc0'
    },
    secondary: {
      main: '#ffffff'
    },
    hoverItem: '#e8eaf6'
  },
});

export default theme

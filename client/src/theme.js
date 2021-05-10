import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';



// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9abf15'
    },
    secondary: {
      main: '#222'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;

import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


const darkTheme = createMuiTheme({
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
      type: 'dark',
    },
  });

export default darkTheme;

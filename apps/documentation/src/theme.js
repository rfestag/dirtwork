import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
  typography: {
    h1: {
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h2: {
      fontWeight: 300,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h3: {
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    h6: {
      fontWeight: 300,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },
});
export default responsiveFontSizes(theme);

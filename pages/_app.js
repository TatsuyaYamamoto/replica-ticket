import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import "../styles/globals.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(46, 154, 234)",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

import { useEffect } from "react";
import "../styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { techChallengeTheme } from "../lib/theme";
import { cssVariables } from "../lib/tokens";

function applyCssVariables() {
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    applyCssVariables();
  }, []);

  return (
    <ThemeProvider theme={techChallengeTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

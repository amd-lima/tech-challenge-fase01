import { createTheme } from "@mui/material/styles";
import { colors } from "./tokens";

export const techChallengeTheme = createTheme({
  palette: {
    primary: {
      main: colors.principal,
      dark: colors.principalDark,
      light: colors.principalLight,
      contrastText: colors.branca,
    },
    secondary: {
      main: colors.secundaria,
      dark: colors.secundariaDark,
      light: colors.secundariaLight,
      contrastText: colors.branca,
    },
    error: {
      main: colors.destaque,
    },
    background: {
      default: colors.fundo,
      paper: colors.branca,
    },
    text: {
      primary: colors.texto,
      secondary: colors.textoSecundario,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, fontSize: "1.562rem" },
    h5: { fontWeight: 600, fontSize: "1.25rem" },
    h6: { fontWeight: 600, fontSize: "1rem" },
    body2: { fontSize: "0.812rem" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

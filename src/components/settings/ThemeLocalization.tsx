// @mui
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

import PropTypes from "prop-types";
// hooks
import useLocales from "../../hooks/useLocales";

// ----------------------------------------------------------------------

ThemeLocalization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeLocalization({ children }) {
  const defaultTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

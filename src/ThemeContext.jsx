import React, { createContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export let ColorModeContext = createContext();

export const CustomThemeProvider = ({ children }) => {

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    const root = document.documentElement;
    if (mode === "dark") {
      root.style.setProperty("--white", "#fff");
      root.style.setProperty("--black", "#000");
      root.style.setProperty("--dark-gray", "#1b1b1b");
      root.style.setProperty("--gray", "#888");
    } else {
      root.style.setProperty("--white", "#000");
      root.style.setProperty("--black", "#fff");
      root.style.setProperty("--dark-gray", "#f0f0f0");
      root.style.setProperty("--gray", "#4d4c4c");
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#3a80e9",
          },
        },
        typography: {
          fontFamily: "Inter, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

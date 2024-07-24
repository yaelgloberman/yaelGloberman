import React, { createContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" && {
            background: {
              default: "#303030", // Gray background for dark mode
              paper: "#424242", // Gray paper background for dark mode
            },
            text: {
              primary: "#ffffff", // White text for dark mode
              secondary: "#808080"
            },
          }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
                root: {
                  ...(mode === "dark" && {
                    color: "#ffffff", // Text color for dark mode
                    backgroundColor: "#424242", // Background color for dark mode
                    '&:hover': {
                      backgroundColor: "#000000", // Background color on hover
                    },
                    '&:active': {
                      backgroundColor: "#000000", // Background color on click
                    },
                    '&:disabled': {
                      backgroundColor: "#61616194", // Background color for disabled state
                      color: "#000000",
                    },
                  }),
                },
              },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                ...(mode === "dark" && {
                  "& .MuiInputBase-input": {
                    color: "#424242", // Text color for dark mode
                  },
                  "& .MuiInputLabel-root": {
                    color: "#bdbdbd", // Label color for dark mode
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#bdbdbd", // Border color for dark mode
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#000000", // Border color on hover for dark mode
                    },
                  "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#000000", // Border color when focused for dark mode
                    },
                }),
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

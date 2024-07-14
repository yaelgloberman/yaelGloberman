import MenuAppBar from "./components/MenuAppBar";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Routes from "./routes";
import { useAppSelector } from "./redux/store";

const queryClient = new QueryClient();

const App = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <MenuAppBar />
            <Routes />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

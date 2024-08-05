import React from "react";

// Component
import {MenuAppBar} from "./components";

// Context
import { ThemeProvider } from "./themeContext";

// React router
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

// React query
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <MenuAppBar />
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

import React from "react";

// Context
import { ThemeProvider } from "./themeContext";

//React router
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

// Component
import MenuAppBar from "./components/MenuAppBar/MenuAppBar";

//React query
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

import React from "react";

// Context
import { ThemeProvider } from "./themeContext";

//React router
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

// Component
import MenuAppBar from "./components/MenueAppBar/MenuAppBar";

//React query
import { QueryClient, QueryClientProvider } from "react-query";
import Classes from "./components/Classes/Classes/Classes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <MenuAppBar />
          <Routes />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

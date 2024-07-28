// App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MenuAppBar from "./components/MenuAppBar";
import Routes from "./routes";
import { ThemeProvider } from "./themeContext";
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
